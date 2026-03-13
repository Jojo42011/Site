import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import http from "node:http";
import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { bookAppointment, checkAvailability } from "./calendarService";
import { loadActiveAgentConfig } from "./agentConfig";
import { readSecrets } from "./secretsStore";
import app, { TWILIO_PATH } from "./app";

// Fly expects the app to listen on process.env.PORT (usually 8080).
// Keep local dev behavior: API_PORT (or 3001) still works.
const PORT = Number(process.env.PORT ?? process.env.API_PORT ?? 3001);

// Serve static frontend from dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");
app.use(express.static(distPath));

// Fallback to index.html for all other routes (SPA)
app.use((_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const server = http.createServer(app);

// Twilio Media Streams WS bridge (does NOT affect the browser demo).
// Twilio sends/receives 8kHz mulaw, so we configure Deepgram Agent the same
// to avoid transcoding and keep latency minimal.
const wss = new WebSocketServer({ server, path: TWILIO_PATH });
wss.on("connection", async (twilioWs) => {
  // eslint-disable-next-line no-console
  console.log("[twilio] WS connected");

  // Read Deepgram API key from secrets store (dashboard) only
  const secrets = await readSecrets();
  const deepgramKey = secrets.deepgramApiKey?.trim() || process.env.DEEPGRAM_API_KEY?.trim();
  if (!deepgramKey) {
    // eslint-disable-next-line no-console
    console.error("[twilio] Rejecting WS connection: Deepgram API key not set in dashboard");
    try {
      twilioWs.close();
    } catch {
      // ignore
    }
    return;
  }

  const agentConfig = await loadActiveAgentConfig();
  const twilioCfg = agentConfig?.integrations?.twilio;
  const callVoiceModel = agentConfig?.voice?.model || "aura-2-vesta-en";
  const callListenModel = agentConfig?.listen?.model || "nova-3";
  const callPrompt = agentConfig?.think?.prompt;
  const bufferFrames =
    typeof twilioCfg?.bufferFrames === "number" && !Number.isNaN(twilioCfg.bufferFrames)
      ? twilioCfg.bufferFrames
      : Number(process.env.TWILIO_BUFFER_FRAMES ?? 10);

  // Connect to Deepgram Voice Agent
  const dgWs = new WebSocket("wss://agent.deepgram.com/v1/agent/converse", [
    "token",
    deepgramKey,
  ]);

  const CALL_TZ = "America/Chicago"; // Central Time (Texas)
  const APPOINTMENT_MINUTES = 90;
  const APPOINTMENT_MS = APPOINTMENT_MINUTES * 60 * 1000;
  const formatCtRange = (startIso: string, endIso: string) => {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const dayFmt = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: CALL_TZ,
    });
    const timeFmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: CALL_TZ,
    });
    return `${dayFmt.format(start)} ${timeFmt.format(start)} – ${timeFmt.format(end)} CT`;
  };

  let streamSid: string | null = null;
  let closed = false;

  // Twilio sends 160-byte mulaw frames (~20ms). Buffer a few for throughput
  // without adding noticeable latency.
  const BUFFER_FRAMES = bufferFrames; // frames of 20ms mulaw => BUFFER_FRAMES * 20ms
  const FRAME_BYTES = 160;
  const BUFFER_SIZE = BUFFER_FRAMES * FRAME_BYTES;
  let inbuffer = Buffer.alloc(0);

  const safeClose = () => {
    if (closed) return;
    closed = true;
    // eslint-disable-next-line no-console
    console.log("[twilio] Closing call bridge");
    try {
      twilioWs.close();
    } catch {
      // ignore
    }
    try {
      dgWs.close();
    } catch {
      // ignore
    }
  };

  dgWs.on("open", () => {
    // eslint-disable-next-line no-console
    console.log("[deepgram] WS open (twilio bridge)");

    const now = new Date();
    const todayYmd = new Intl.DateTimeFormat("en-CA", {
      timeZone: CALL_TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    const settings = {
      type: "Settings",
      audio: {
        input: { encoding: "mulaw", sample_rate: 8000 },
        output: { encoding: "mulaw", sample_rate: 8000, container: "none" },
      },
      agent: {
        language: "en",
        listen: { provider: { type: "deepgram", model: callListenModel } },
        think: {
          provider: { type: "open_ai", model: "gpt-4o-mini", temperature: 0.7 },
          prompt:
            callPrompt ||
            ("You are a professional service coordinator for EquipTech Dental serving Chicago and surrounding suburbs. " +
              "Keep replies to 1–2 short sentences and ask one question at a time. " +
              "Goal: triage (emergency vs scheduled), gather essentials, and book service. " +
              `Timezone: ${CALL_TZ}. Today's date is ${todayYmd}. ` +
              `Appointments are typically ${APPOINTMENT_MINUTES} minutes. ` +
              "Always call check_availability with a full YYYY-MM-DD date and offer returned slots only."),
          functions: [
            {
              name: "check_availability",
              description:
                `Check available appointment time slots for dental equipment service calls. All returned options are Central Time (Chicago) and ${APPOINTMENT_MINUTES} minutes long. Call this when a practice asks about availability or wants to schedule service.`,
              parameters: {
                type: "object",
                properties: {
                  date: {
                    type: "string",
                    description: "The date to check in YYYY-MM-DD format",
                  },
                },
                required: ["date"],
              },
            },
            {
              name: "book_appointment",
              description:
                `Book a confirmed service appointment after the practice agrees to a time. Appointment length is typically ${APPOINTMENT_MINUTES} minutes (Central Time - Chicago). Only call this after confirming all details: practice name, address, phone, equipment type, and problem description.`,
              parameters: {
                type: "object",
                properties: {
                  startTime: {
                    type: "string",
                    description:
                      "ISO datetime string for appointment start (must match the chosen Central Time option's startTime)",
                  },
                  endTime: {
                    type: "string",
                    description:
                      "ISO datetime string for appointment end (can be provided, but server enforces 90 minutes)",
                  },
                  customerName: {
                    type: "string",
                    description: "Practice name or contact person's full name",
                  },
                  customerPhone: {
                    type: "string",
                    description: "Practice phone number",
                  },
                  serviceType: {
                    type: "string",
                    description: "Type of service (e.g., 'Emergency repair - Dental chair', 'Scheduled maintenance - X-ray unit', 'Handpiece repair - Expedited')",
                  },
                },
                required: ["startTime", "endTime", "customerName", "customerPhone", "serviceType"],
              },
            },
          ],
        },
        speak: { provider: { type: "deepgram", model: callVoiceModel } },
        greeting:
          agentConfig?.greeting ||
          "Hi, this is EquipTech Dental. I understand you need equipment service—do you have a quick minute?",
      },
    };
    dgWs.send(JSON.stringify(settings));
  });

  dgWs.on("message", (data, isBinary) => {
    if (closed) return;

    if (!isBinary) {
      try {
        const msg = JSON.parse(data.toString());
        if (msg?.type) {
          // eslint-disable-next-line no-console
          console.log(`[deepgram] event: ${msg.type}`);
        }
        if (msg?.type === "FunctionCallRequest" && Array.isArray(msg.functions)) {
          (async () => {
            for (const func of msg.functions) {
              try {
                const args = JSON.parse(func?.arguments ?? "{}");
                if (func?.name === "check_availability") {
                  const date = String(args.date ?? "");
                  const slots = await checkAvailability(date);
                  const detailed = slots.map((startIso) => {
                    const start = new Date(startIso);
                    const end = new Date(start.getTime() + APPOINTMENT_MS);
                    return {
                      label: formatCtRange(start.toISOString(), end.toISOString()),
                      startTime: start.toISOString(),
                      endTime: end.toISOString(),
                    };
                  });

                  // Limit to first 3 slots for agent to mention
                  const slotsToMention = detailed.slice(0, 3);
                  const hasMoreSlots = detailed.length > 3;

                  const now = new Date();
                  const todayYmd = new Intl.DateTimeFormat("en-CA", {
                    timeZone: "America/Chicago",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(now);

                  const content =
                    detailed.length === 0
                      ? `No openings found for ${date} in Central Time (Texas). Today is ${todayYmd}. Ask the customer for another date.`
                      : [
                        `Available ${APPOINTMENT_MINUTES}-minute slots for ${date} (Central Time - Texas):`,
                        ...slotsToMention.map((s, i) => `${i + 1}) ${s.label}`),
                        hasMoreSlots ? `(${detailed.length - 3} more slots available if needed)` : "",
                        "",
                        "For booking tool use ONLY (do not read aloud):",
                        ...detailed.map((s, i) => `${i + 1}) startTime=${s.startTime} endTime=${s.endTime}`),
                      ].filter(line => line !== "").join("\n");
                  dgWs.send(
                    JSON.stringify({
                      type: "FunctionCallResponse",
                      id: func.id,
                      name: "check_availability",
                      content,
                    }),
                  );
                } else if (func?.name === "book_appointment") {
                  const startTime = String(args.startTime ?? "");
                  const endTime = String(args.endTime ?? "");
                  const customerName = String(args.customerName ?? "");
                  const customerPhone = String(args.customerPhone ?? "");
                  const serviceType = String(args.serviceType ?? "");
                  const event = await bookAppointment(startTime, endTime, customerName, customerPhone, serviceType);
                  const eventStart = String(event?.start?.dateTime ?? startTime);
                  const eventEnd = String(event?.end?.dateTime ?? endTime);
                  const label = formatCtRange(eventStart, eventEnd);
                  dgWs.send(
                    JSON.stringify({
                      type: "FunctionCallResponse",
                      id: func.id,
                      name: "book_appointment",
                      content: `Booked successfully for ${label}.`,
                    }),
                  );
                } else {
                  dgWs.send(
                    JSON.stringify({
                      type: "FunctionCallResponse",
                      id: func.id,
                      name: func?.name ?? "unknown",
                      content: `Unknown function: ${String(func?.name)}`,
                    }),
                  );
                }
              } catch (e) {
                dgWs.send(
                  JSON.stringify({
                    type: "FunctionCallResponse",
                    id: func?.id ?? "unknown",
                    name: func?.name ?? "unknown",
                    content: e instanceof Error ? e.message : String(e),
                  }),
                );
              }
            }
          })().catch(() => {
            // ignore
          });
        }

        if (msg?.type === "UserStartedSpeaking" && streamSid) {
          // Handle barge-in: if user starts speaking, clear any buffered agent audio in Twilio.
          twilioWs.send(
            JSON.stringify({
              event: "clear",
              streamSid,
            }),
          );
        }
      } catch {
        // ignore
      }
      return;
    }

    // Binary audio from Deepgram is raw mulaw; Twilio expects base64 payload.
    if (!streamSid) return;
    const rawMulaw = data instanceof Buffer ? data : Buffer.from(data as ArrayBuffer);
    twilioWs.send(
      JSON.stringify({
        event: "media",
        streamSid,
        media: { payload: rawMulaw.toString("base64") },
      }),
    );
  });

  dgWs.on("close", safeClose);
  dgWs.on("error", (e) => {
    // eslint-disable-next-line no-console
    console.error("[deepgram] WS error (twilio bridge):", e);
    safeClose();
  });

  twilioWs.on("message", (message) => {
    if (closed) return;
    try {
      const data = JSON.parse(message.toString());
      if (data.event === "connected") return;
      if (data.event === "start") {
        streamSid = data.start?.streamSid ?? null;
        // eslint-disable-next-line no-console
        console.log(`[twilio] start streamSid=${streamSid}`);
        return;
      }
      if (data.event === "stop") {
        // eslint-disable-next-line no-console
        console.log("[twilio] stop");
        safeClose();
        return;
      }
      if (data.event === "media") {
        const payload = data.media?.payload;
        const track = data.media?.track;
        if (track !== "inbound" || typeof payload !== "string") return;

        const chunk = Buffer.from(payload, "base64"); // raw mulaw
        inbuffer = Buffer.concat([inbuffer as unknown as Uint8Array, chunk as unknown as Uint8Array]) as Buffer;

        while (inbuffer.length >= BUFFER_SIZE) {
          const out = inbuffer.subarray(0, BUFFER_SIZE) as Buffer;
          inbuffer = inbuffer.subarray(BUFFER_SIZE) as Buffer;
          if (dgWs.readyState === WebSocket.OPEN) dgWs.send(out);
        }
      }
    } catch {
      // ignore malformed frames
    }
  });

  twilioWs.on("close", () => {
    // eslint-disable-next-line no-console
    console.log("[twilio] WS closed");
    safeClose();
  });
  twilioWs.on("error", (e) => {
    // eslint-disable-next-line no-console
    console.error("[twilio] WS error:", e);
    safeClose();
  });
});

server.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on 0.0.0.0:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[twilio] WS listening on ${TWILIO_PATH} (Twilio Media Streams)`);
});
