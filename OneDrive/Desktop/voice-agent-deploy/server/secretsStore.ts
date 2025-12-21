import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname } from "path";

export type StoredSecrets = {
  deepgramApiKey?: string;
  openAiApiKey?: string;
  twilio?: {
    accountSid?: string;
    authToken?: string;
    phoneNumber?: string;
    publicBaseUrl?: string;
    wsPath?: string;
    bufferFrames?: number;
  };
  calendar?: {
    serviceAccountEmail?: string;
    calendarId?: string;
    timeZone?: string;
    privateKey?: string;
  };
};

const SECRETS_PATH = process.env.SECRETS_PATH?.trim() || "/data/secrets.json";

async function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
}

export async function readSecrets(): Promise<StoredSecrets> {
  try {
    const raw = await readFile(SECRETS_PATH, "utf-8");
    return JSON.parse(raw) as StoredSecrets;
  } catch {
    return {};
  }
}

export async function writeSecrets(next: StoredSecrets): Promise<void> {
  await ensureDir(SECRETS_PATH);
  await writeFile(SECRETS_PATH, JSON.stringify(next, null, 2), "utf-8");
}

/**
 * Merge new fields into existing secrets (shallow merge by top-level keys).
 */
export async function mergeSecrets(partial: Partial<StoredSecrets>): Promise<StoredSecrets> {
  const current = await readSecrets();
  const merged: StoredSecrets = {
    ...current,
    ...partial,
    twilio: { ...(current.twilio ?? {}), ...(partial.twilio ?? {}) },
    calendar: { ...(current.calendar ?? {}), ...(partial.calendar ?? {}) },
  };
  await writeSecrets(merged);
  return merged;
}


