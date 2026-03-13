import "dotenv/config";
import express from "express";
import cors from "cors";
import { pcm16ToWav } from "./wav";
import { bookAppointment, checkAvailability } from "./calendarService";
import agentsRouter from "./routes/agents";
import { loadActiveAgentConfig, loadActiveAgentConfigSync } from "./agentConfig";
import { mergeSecrets, readSecrets } from "./secretsStore";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY?.trim();
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
const TWILIO_PATH_ENV = process.env.TWILIO_WS_PATH ?? "/twilio";
const BOOT_AGENT = loadActiveAgentConfigSync();
export const TWILIO_PATH =
  BOOT_AGENT?.integrations?.twilio?.wsPath && BOOT_AGENT.integrations.twilio.wsPath.trim()
    ? BOOT_AGENT.integrations.twilio.wsPath.trim()
    : TWILIO_PATH_ENV;

if (!DEEPGRAM_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn("[api] DEEPGRAM_API_KEY is not set yet. Twilio bridge and AI endpoints will not work until it is set.");
}

const app = express();
// Respect X-Forwarded-* headers from Vercel / ngrok / proxies so req.protocol/host are correct.
app.set("trust proxy", true);
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/healthz", (_req, res) => res.json({ ok: true }));
app.get("/api/config", async (_req, res) => {
  const secrets = await readSecrets();
  res.json({
    ok: true,
    deepgramConfigured: Boolean(secrets.deepgramApiKey?.trim() || DEEPGRAM_API_KEY),
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

// Expose Deepgram API key for the browser demo.
// Falls back to DEEPGRAM_API_KEY env var so Vercel deployments work without the file store.
app.get("/api/deepgram-key", async (_req, res) => {
  try {
    const secrets = await readSecrets();
    const key = secrets.deepgramApiKey?.trim() || DEEPGRAM_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "Deepgram API key not set. Add DEEPGRAM_API_KEY as an environment variable or set it in the Credentials section of the dashboard." });
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

// Optional TwiML webhook for Twilio phone integration.
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
      const secrets = await readSecrets();
      const deepgramKey = secrets.deepgramApiKey?.trim() || DEEPGRAM_API_KEY;
      if (!deepgramKey) {
        return res.status(500).json({ error: "Deepgram API key not set. Add DEEPGRAM_API_KEY as an environment variable or set it in the dashboard." });
      }
      const sampleRate = Number(req.query.sampleRate ?? 16000);
      const channels = Number(req.query.channels ?? 1);
      const pcm = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body as any);
      if (!pcm.length) return res.status(400).json({ error: "Empty audio body" });

      const wav = pcm16ToWav({ pcm16le: pcm, sampleRate, channels });

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

export default app;
