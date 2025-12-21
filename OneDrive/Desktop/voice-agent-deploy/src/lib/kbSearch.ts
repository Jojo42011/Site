import { KNOWLEDGE_BASE_TEXT, initializeKnowledgeBase } from "./knowledgeBase";

type KbHit = { score: number; snippet: string };

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function chunkText(text: string): string[] {
  const raw = text.replace(/\r\n/g, "\n").trim();
  if (!raw || raw === "PASTE_KNOWLEDGE_BASE_BELOW") return [];

  // Prefer paragraph chunks, then fall back to rough sizing.
  const paras = raw.split(/\n{2,}/g).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];

  for (const p of paras.length ? paras : [raw]) {
    if (p.length <= 900) {
      chunks.push(p);
      continue;
    }
    // Split long paragraphs into ~700-900 char chunks.
    let i = 0;
    while (i < p.length) {
      chunks.push(p.slice(i, i + 850).trim());
      i += 850;
    }
  }
  return chunks;
}

// Initialize chunks dynamically when KB is loaded
let KB_CHUNKS: string[] = [];
let KB_NORM: string[] = [];

function updateKbChunks() {
  KB_CHUNKS = chunkText(KNOWLEDGE_BASE_TEXT);
  KB_NORM = KB_CHUNKS.map(normalize);
}

// Update chunks when KNOWLEDGE_BASE_TEXT changes (called from knowledgeBase.ts)
export function refreshKbChunks() {
  updateKbChunks();
}

// Initialize on first load
updateKbChunks();

export function searchKb(query: string, topK = 4): KbHit[] {
  const q = normalize(query);
  if (!q || !KB_CHUNKS.length) return [];

  const qTokens = q.split(" ").filter((t) => t.length >= 3);
  if (!qTokens.length) return [];

  const hits: KbHit[] = [];

  for (let i = 0; i < KB_NORM.length; i++) {
    const c = KB_NORM[i]!;
    let score = 0;
    for (const tok of qTokens) {
      if (c.includes(tok)) score += 1;
    }
    if (score > 0) hits.push({ score, snippet: KB_CHUNKS[i]! });
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, topK);
}
















