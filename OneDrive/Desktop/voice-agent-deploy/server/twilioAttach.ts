import "dotenv/config";
import twilio from "twilio";

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  PUBLIC_BASE_URL,
  NGROK_API_URL,
} = process.env;

function req(name: string, val: string | undefined): string {
  if (!val || !val.trim()) throw new Error(`Missing ${name} in .env`);
  // Strip surrounding quotes if present (common Windows/.env gotcha)
  const t = val.trim();
  return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))
    ? t.slice(1, -1).trim()
    : t;
}

async function main() {
  const sid = req("TWILIO_ACCOUNT_SID", TWILIO_ACCOUNT_SID);
  const token = req("TWILIO_AUTH_TOKEN", TWILIO_AUTH_TOKEN);
  const phone = req("TWILIO_PHONE_NUMBER", TWILIO_PHONE_NUMBER);
  let base = (PUBLIC_BASE_URL ?? "").trim();

  // If PUBLIC_BASE_URL isn't set (or you don't want to edit .env every ngrok restart),
  // auto-detect the current ngrok public URL from the local inspector API.
  // Default inspector: http://127.0.0.1:4040
  if (!base) {
    const api = (NGROK_API_URL ?? "http://127.0.0.1:4040/api/tunnels").trim();
    const resp = await fetch(api);
    if (!resp.ok) throw new Error(`Failed to read ngrok tunnels from ${api} (status ${resp.status})`);
    const json = (await resp.json()) as any;
    const tunnels: any[] = Array.isArray(json?.tunnels) ? json.tunnels : [];
    const https = tunnels.find((t) => typeof t?.public_url === "string" && t.public_url.startsWith("https://"));
    if (!https?.public_url) {
      throw new Error(
        "Could not find an https ngrok tunnel. Start ngrok (e.g. `ngrok http 3001`) and try again.",
      );
    }
    base = String(https.public_url);
  }

  base = base.replace(/\/$/, "");

  if (!/^AC[a-f0-9]{32}$/i.test(sid)) {
    throw new Error("TWILIO_ACCOUNT_SID does not look valid (expected AC + 32 hex chars).");
  }
  // Auth tokens are typically 32 chars. If yours is different, this will catch truncation.
  if (token.length < 32) {
    throw new Error(
      `TWILIO_AUTH_TOKEN looks too short (got length ${token.length}). Re-copy it from Twilio Console and update .env.`,
    );
  }
  if (!/^\+?\d{10,15}$/.test(phone)) {
    throw new Error("TWILIO_PHONE_NUMBER should be in E.164 format, e.g. +17579143060.");
  }

  const voiceUrl = `${base}/twilio/voice`;

  const client = twilio(sid, token);

  const list = await client.incomingPhoneNumbers.list({ phoneNumber: phone, limit: 1 });
  if (!list.length) {
    throw new Error(`No Twilio IncomingPhoneNumber found for ${phone}. Check TWILIO_PHONE_NUMBER.`);
  }

  const record = list[0]!;
  await client.incomingPhoneNumbers(record.sid).update({
    voiceUrl,
    voiceMethod: "POST",
  });

  // eslint-disable-next-line no-console
  console.log(`[twilio] Attached ${phone} -> ${voiceUrl}`);
  // eslint-disable-next-line no-console
  console.log(`[twilio] Now call ${phone} and Twilio will fetch TwiML from /twilio/voice`);
}

main().catch((e) => {
  const anyErr = e as any;
  const parts: Record<string, unknown> = {
    message: e instanceof Error ? e.message : String(e),
  };

  // Twilio RestException often includes these fields
  if (anyErr?.status) parts.status = anyErr.status;
  if (anyErr?.code) parts.code = anyErr.code;
  if (anyErr?.moreInfo) parts.moreInfo = anyErr.moreInfo;
  if (anyErr?.details) parts.details = anyErr.details;

  // eslint-disable-next-line no-console
  console.error(`[twilio] attach failed: ${JSON.stringify(parts, null, 2)}`);
  process.exit(1);
});


