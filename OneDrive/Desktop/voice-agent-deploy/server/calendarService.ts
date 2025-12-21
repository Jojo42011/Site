import { google } from "googleapis";
import { loadActiveAgentConfig } from "./agentConfig";
import { readSecrets } from "./secretsStore";

// Central Time for Texas (handles DST automatically).
const TZ = process.env.GOOGLE_TIMEZONE?.trim() || "America/Chicago";

const APPOINTMENT_MINUTES = 90;
const APPOINTMENT_MS = APPOINTMENT_MINUTES * 60 * 1000;

async function reqConfig(name: string): Promise<string> {
  // Read from dashboard secrets store only
  const secrets = await readSecrets();
  const fromSecrets = {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: secrets.calendar?.serviceAccountEmail,
    GOOGLE_CALENDAR_ID: secrets.calendar?.calendarId,
    GOOGLE_PRIVATE_KEY: secrets.calendar?.privateKey,
  }[name];
  if (fromSecrets?.trim()) return fromSecrets.trim();
  throw new Error(`Missing required calendar setting: ${name}. Please add it in the dashboard Credentials section.`);
}

async function getJwtClient() {
  const email = await reqConfig("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const calendarId = await reqConfig("GOOGLE_CALENDAR_ID");

  const rawKey = await reqConfig("GOOGLE_PRIVATE_KEY");
  const key = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  const jwt = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return { jwt, calendarId };
}

function parseYmd(date: string): { y: number; m: number; d: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) throw new Error(`Invalid date format. Expected YYYY-MM-DD, got: ${date}`);
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
}

function todayYmdInTz(timeZone: string): string {
  const now = new Date();
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return dtf.format(now); // YYYY-MM-DD
}

function isPastYmd(dateYmd: string, timeZone: string): boolean {
  const today = todayYmdInTz(timeZone);
  return dateYmd < today;
}

function getZonedParts(date: Date, timeZone: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

// Convert a local time in `timeZone` to a UTC Date.
// This avoids pulling in a full timezone library, while still handling DST.
function zonedTimeToUtc(
  timeZone: string,
  y: number,
  m: number,
  d: number,
  hh: number,
  mm = 0,
  ss = 0,
): Date {
  // Start with a naive UTC guess.
  let guess = new Date(Date.UTC(y, m - 1, d, hh, mm, ss));

  // Iterate to converge. 2-3 iterations is plenty for timezone offsets.
  for (let i = 0; i < 3; i++) {
    const zp = getZonedParts(guess, timeZone);
    const asUtc = Date.UTC(zp.year, zp.month - 1, zp.day, zp.hour, zp.minute, zp.second);
    const desiredAsUtc = Date.UTC(y, m - 1, d, hh, mm, ss);
    const diff = asUtc - desiredAsUtc;
    if (diff === 0) break;
    guess = new Date(guess.getTime() - diff);
  }

  return guess;
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Returns available 90-minute appointment slots for a given date.
 *
 * - Generates slots between 9:00 AM and 5:00 PM (local timezone).
 * - Excludes any busy times returned by Google Calendar freebusy.
 * - Returns array of ISO strings (UTC) representing the slot START times.
 */
export async function checkAvailability(date: string): Promise<string[]> {
  const startedAt = Date.now();
  try {
    const agentConfig = await loadActiveAgentConfig();
    const cfgTz = agentConfig?.integrations?.calendar?.config?.timeZone?.trim();
    const effectiveTz = cfgTz || TZ;

    if (isPastYmd(date, effectiveTz)) {
      const today = todayYmdInTz(effectiveTz);
      throw new Error(
        `ERROR: Date is in the past. You provided ${date}, but today is ${today} (${effectiveTz}). ` +
        `You MUST ask the customer for a future date. Do NOT retry with the same date. ` +
        `If the customer mentions a date without a year (e.g., "November 1st"), assume they mean the NEXT occurrence of that date in the future, not a past date. ` +
        `Always use the current year (${today.split('-')[0]}) or later when inferring dates.`
      );
    }
    const { y, m, d } = parseYmd(date);
    const { jwt, calendarId } = await getJwtClient();

    const calendar = google.calendar({ version: "v3", auth: jwt });

    const dayStartUtc = zonedTimeToUtc(effectiveTz, y, m, d, 9, 0, 0);
    const dayEndUtc = zonedTimeToUtc(effectiveTz, y, m, d, 17, 0, 0);

    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStartUtc.toISOString(),
        timeMax: dayEndUtc.toISOString(),
        timeZone: effectiveTz,
        items: [{ id: calendarId }],
      },
    });

    const busy =
      fb.data.calendars?.[calendarId]?.busy?.map((b) => ({
        startMs: b.start ? Date.parse(b.start) : NaN,
        endMs: b.end ? Date.parse(b.end) : NaN,
      })) ?? [];

    const slots: Array<{ start: Date; end: Date }> = [];
    const dayStartMinutes = 9 * 60;
    const dayEndMinutes = 17 * 60;
    for (
      let startMinutes = dayStartMinutes;
      startMinutes + APPOINTMENT_MINUTES <= dayEndMinutes;
      startMinutes += APPOINTMENT_MINUTES
    ) {
      const sh = Math.floor(startMinutes / 60);
      const sm = startMinutes % 60;
      const endMinutes = startMinutes + APPOINTMENT_MINUTES;
      const eh = Math.floor(endMinutes / 60);
      const em = endMinutes % 60;
      const start = zonedTimeToUtc(TZ, y, m, d, sh, sm, 0);
        const end = zonedTimeToUtc(effectiveTz, y, m, d, eh, em, 0);
      slots.push({ start, end });
    }

    const available = slots
      .filter(({ start, end }) => {
        const s = start.getTime();
        const e = end.getTime();
        // Exclude if overlaps any busy interval.
        return !busy.some((b) => Number.isFinite(b.startMs) && Number.isFinite(b.endMs) && overlaps(s, e, b.startMs, b.endMs));
      })
      .map(({ start }) => start.toISOString());

    // eslint-disable-next-line no-console
    console.log(
      `[calendar] checkAvailability date=${date} tz=${effectiveTz} busy=${busy.length} available=${available.length} durationMs=${Date.now() - startedAt}`,
    );

    return available;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[calendar] checkAvailability failed:", err);
    throw err;
  }
}

/**
 * Creates a calendar event for an appointment.
 */
export async function bookAppointment(
  startTime: string,
  endTime: string,
  customerName: string,
  customerPhone: string,
  serviceType: string,
) {
  const startedAt = Date.now();
  try {
    const agentConfig = await loadActiveAgentConfig();
    const cfgTz = agentConfig?.integrations?.calendar?.config?.timeZone?.trim();
    const effectiveTz = cfgTz || TZ;

    const { jwt, calendarId } = await getJwtClient();
    const calendar = google.calendar({ version: "v3", auth: jwt });

    const summary = `${serviceType} - ${customerName}`;
    const description = [`Customer: ${customerName}`, `Phone: ${customerPhone}`, `Service: ${serviceType}`].join("\n");

    const start = new Date(startTime);
    if (Number.isNaN(start.getTime())) {
      throw new Error(`Invalid startTime. Expected ISO datetime, got: ${startTime}`);
    }
    // Disallow booking in the past (give a small 2-minute grace for clock skew).
    if (start.getTime() < Date.now() - 2 * 60 * 1000) {
      throw new Error(`startTime is in the past. Got ${start.toISOString()}. Please choose a future time.`);
    }
    const enforcedEnd = new Date(start.getTime() + APPOINTMENT_MS);
    
    // Format times in local timezone (without Z suffix) for Google Calendar
    // Google Calendar expects datetime in the specified timezone, not UTC
    const formatLocalTime = (date: Date) => {
      const parts = getZonedParts(date, effectiveTz);
      return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}T${String(parts.hour).padStart(2, '0')}:${String(parts.minute).padStart(2, '0')}:${String(parts.second).padStart(2, '0')}`;
    };
    
    const startLocal = formatLocalTime(start);
    const endLocal = formatLocalTime(enforcedEnd);

    if (endTime) {
      // eslint-disable-next-line no-console
      console.log(
        `[calendar] bookAppointment: using ${APPOINTMENT_MINUTES}min duration. Start: ${startLocal} CT, End: ${endLocal} CT`,
      );
    }

    const resp = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary,
        description,
        start: { dateTime: startLocal, timeZone: effectiveTz },
        end: { dateTime: endLocal, timeZone: effectiveTz },
      },
    });

    // eslint-disable-next-line no-console
    console.log(
      `[calendar] bookAppointment ok calendarId=${calendarId} start=${startLocal} ${effectiveTz} end=${endLocal} ${effectiveTz} durationMs=${Date.now() - startedAt}`,
    );

    return resp.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[calendar] bookAppointment failed:", err);
    throw err;
  }
}


