import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import http from "node:http";
import { WebSocket, WebSocketServer } from "ws";
import { pcm16ToWav } from "./wav";
import { bookAppointment, checkAvailability } from "./calendarService";
import agentsRouter from "./routes/agents";
import { loadActiveAgentConfig, loadActiveAgentConfigSync } from "./agentConfig";
import { mergeSecrets, readSecrets } from "./secretsStore";

// Fly expects the app to listen on process.env.PORT (usually 8080).
// Keep local dev behavior: API_PORT (or 3001) still works.
const PORT = Number(process.env.PORT ?? process.env.API_PORT ?? 3001);
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY?.trim();
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL; // e.g. https://xxxx.ngrok-free.app
const TWILIO_PATH_ENV = process.env.TWILIO_WS_PATH ?? "/twilio";
const BOOT_AGENT = loadActiveAgentConfigSync();
const TWILIO_PATH =
  BOOT_AGENT?.integrations?.twilio?.wsPath && BOOT_AGENT.integrations.twilio.wsPath.trim()
    ? BOOT_AGENT.integrations.twilio.wsPath.trim()
    : TWILIO_PATH_ENV;

if (!DEEPGRAM_API_KEY) {
  // Don't crash the server—allow deploy first, then add secrets later.
  // Twilio/Audio Intelligence endpoints will return helpful errors until set.
  // eslint-disable-next-line no-console
  console.warn("[api] DEEPGRAM_API_KEY is not set yet. Twilio bridge and AI endpoints will not work until it is set.");
}

const app = express();
// Respect X-Forwarded-* headers from ngrok / proxies so req.protocol/host are correct.
app.set("trust proxy", true);
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Serve static frontend from dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");
app.use(express.static(distPath));

app.get("/api/healthz", (_req, res) => res.json({ ok: true }));
app.get("/api/config", async (_req, res) => {
  const secrets = await readSecrets();
  res.json({
    ok: true,
    deepgramConfigured: Boolean(secrets.deepgramApiKey?.trim()),
    twilioPath: TWILIO_PATH,
  });
});

// Secrets: simple admin endpoints (dashboard is assumed to be protected by deployment)
app.get("/api/secrets", async (_req, res) => {
  try {
    const secrets = await readSecrets();
    return res.json({
      deepgramApiKey: secrets.deepgramApiKey ?? null,
      openAiApiKey: secrets.openAiApiKey ?? null,
      twilio: secrets.twilio ?? {},
      calendar: secrets.calendar ?? {},
    });
  } catch (error) {
    console.error("[api] GET /api/secrets failed:", error);
    return res.status(500).json({ error: "Failed to load secrets" });
  }
});

app.post("/api/secrets", async (req, res) => {
  try {
    const body = req.body ?? {};
    const partial = {
      deepgramApiKey: typeof body.deepgramApiKey === "string" ? body.deepgramApiKey.trim() : undefined,
      openAiApiKey: typeof body.openAiApiKey === "string" ? body.openAiApiKey.trim() : undefined,
      twilio: typeof body.twilio === "object" && body.twilio !== null ? {
        accountSid: body.twilio.accountSid?.trim(),
        authToken: body.twilio.authToken?.trim(),
        phoneNumber: body.twilio.phoneNumber?.trim(),
        publicBaseUrl: body.twilio.publicBaseUrl?.trim(),
        wsPath: body.twilio.wsPath?.trim(),
        bufferFrames: typeof body.twilio.bufferFrames === "number" ? body.twilio.bufferFrames : undefined,
      } : undefined,
      calendar: typeof body.calendar === "object" && body.calendar !== null ? {
        serviceAccountEmail: body.calendar.serviceAccountEmail?.trim(),
        calendarId: body.calendar.calendarId?.trim(),
        timeZone: body.calendar.timeZone?.trim(),
        privateKey: body.calendar.privateKey,
      } : undefined,
    };
    const saved = await mergeSecrets(partial);
    return res.json({ success: true, saved });
  } catch (error) {
    console.error("[api] POST /api/secrets failed:", error);
    return res.status(500).json({ error: "Failed to save secrets" });
  }
});

// Expose Deepgram API key for the browser demo (reads ONLY from dashboard secrets store).
app.get("/api/deepgram-key", async (_req, res) => {
  try {
    const secrets = await readSecrets();
    const key = secrets.deepgramApiKey?.trim();
    if (!key) {
      return res.status(500).json({ error: "Deepgram API key not set in dashboard. Please add it in the Credentials section." });
    }
    return res.json({ key });
  } catch (error) {
    console.error("[api] GET /api/deepgram-key failed:", error);
    return res.status(500).json({ error: "Failed to load Deepgram API key" });
  }
});

// Agent management routes
app.use("/api/agents", agentsRouter);

app.post("/api/check-availability", async (req, res) => {
  try {
    const date = String(req.body?.date ?? "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, error: "Invalid date. Expected YYYY-MM-DD." });
    }
    const slots = await checkAvailability(date);
    return res.json({ success: true, slots });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[api] /api/check-availability failed:", e);
    const msg = e instanceof Error ? e.message : String(e);
    const status = /Invalid date|past|future date/i.test(msg) ? 400 : 500;
    return res.status(status).json({ success: false, error: msg });
  }
});

app.post("/api/book-appointment", async (req, res) => {
  try {
    const startTime = String(req.body?.startTime ?? "");
    const endTime = String(req.body?.endTime ?? "");
    const customerName = String(req.body?.customerName ?? "");
    const customerPhone = String(req.body?.customerPhone ?? "");
    const serviceType = String(req.body?.serviceType ?? "");

    if (!startTime || !endTime || !customerName || !customerPhone || !serviceType) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: startTime, endTime, customerName, customerPhone, serviceType",
      });
    }

    const event = await bookAppointment(startTime, endTime, customerName, customerPhone, serviceType);
    return res.json({ success: true, event });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[api] /api/book-appointment failed:", e);
    const msg = e instanceof Error ? e.message : String(e);
    const status = /Invalid startTime|past|future time/i.test(msg) ? 400 : 500;
    return res.status(status).json({ success: false, error: msg });
  }
});

// Optional TwiML webhook (useful if you don't want to use a TwiML Bin).
// Point your Twilio number "A CALL COMES IN" webhook here:
//   https://YOUR_PUBLIC_URL/twilio/voice
// Twilio can be configured for GET or POST; accept both to avoid misconfig issues.
app.all("/twilio/voice", express.urlencoded({ extended: false }), async (req, res) => {
  const agentConfig = await loadActiveAgentConfig();
  const cfg = agentConfig?.integrations?.twilio;

  const base =
    (cfg?.publicBaseUrl && cfg.publicBaseUrl.trim().length > 0
      ? cfg.publicBaseUrl.trim().replace(/\/$/, "")
      : undefined) ??
    (typeof PUBLIC_BASE_URL === "string" && PUBLIC_BASE_URL.trim().length > 0
      ? PUBLIC_BASE_URL.trim().replace(/\/$/, "")
      : `${req.protocol}://${req.get("host")}`);

  const wsUrl = base.replace(/^http/i, "ws") + TWILIO_PATH;
  // eslint-disable-next-line no-console
  console.log(`[twilio] /twilio/voice -> stream url: ${wsUrl}`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="en">This call may be monitored or recorded.</Say>
  <Connect>
    <Stream url="${wsUrl}" />
  </Connect>
</Response>`;
  res.setHeader("Content-Type", "text/xml");
  res.send(xml);
});

// Accept raw PCM16LE from the browser.
app.post(
  "/api/audio-intelligence",
  express.raw({ type: "application/octet-stream", limit: "25mb" }),
  async (req, res) => {
    try {
      // Read Deepgram API key from secrets store (dashboard) only
      const secrets = await readSecrets();
      const deepgramKey = secrets.deepgramApiKey?.trim();
      if (!deepgramKey) {
        return res.status(500).json({ error: "Deepgram API key not set in dashboard. Please add it in the Credentials section." });
      }
      const sampleRate = Number(req.query.sampleRate ?? 16000);
      const channels = Number(req.query.channels ?? 1);
      const pcm = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body as any);
      if (!pcm.length) return res.status(400).json({ error: "Empty audio body" });

      const wav = pcm16ToWav({ pcm16le: pcm, sampleRate, channels });

      // Audio Intelligence options per docs:
      // - summarize/topics/intents/sentiment all operate on transcript
      // Ref: https://developers.deepgram.com/docs/audio-intelligence
      const url = new URL("https://api.deepgram.com/v1/listen");
      url.searchParams.set("model", "nova-3");
      url.searchParams.set("language", "en");
      url.searchParams.set("smart_format", "true");
      url.searchParams.set("summarize", "v2");
      url.searchParams.set("topics", "true");
      url.searchParams.set("intents", "true");
      url.searchParams.set("sentiment", "true");

      const dgResp = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Authorization: `Token ${deepgramKey}`,
          "Content-Type": "audio/wav",
        },
        body: new Uint8Array(wav),
      });

      const text = await dgResp.text();
      let json: unknown = text;
      try {
        json = JSON.parse(text);
      } catch {
        // leave as text
      }

      if (!dgResp.ok) {
        return res.status(dgResp.status).json({
          error: "Deepgram request failed",
          status: dgResp.status,
          details: json,
        });
      }

      return res.json(json);
    } catch (e) {
      return res.status(500).json({ error: e instanceof Error ? e.message : String(e) });
    }
  },
);

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
  const deepgramKey = secrets.deepgramApiKey?.trim();
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
          // Keep it short + fast for phone calls (telephony bandwidth).
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