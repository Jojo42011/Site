// In-memory rolling buffer of recent mic audio (PCM16LE).
// Used to run Deepgram Audio Intelligence on what the user just said.

const chunks: Uint8Array[] = [];
let totalBytes = 0;

// Keep last ~90s @ 16kHz mono PCM16: 16000 samples/s * 2 bytes * 90 = 2.88MB
const MAX_BYTES = 16000 * 2 * 90;

export function pushPcm16Chunk(ab: ArrayBuffer) {
  const u8 = new Uint8Array(ab);
  if (!u8.byteLength) return;
  chunks.push(u8);
  totalBytes += u8.byteLength;

  while (totalBytes > MAX_BYTES && chunks.length > 1) {
    const dropped = chunks.shift();
    totalBytes -= dropped?.byteLength ?? 0;
  }
}

export function getPcm16Snapshot(): Uint8Array {
  const out = new Uint8Array(totalBytes);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.byteLength;
  }
  return out;
}

export function clearPcm16Capture() {
  chunks.length = 0;
  totalBytes = 0;
}




















