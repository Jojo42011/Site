import { readFile } from "fs/promises";
import { readFileSync } from "fs";
import { join } from "path";
import type { AgentConfig } from "../src/lib/agentTypes";

const AGENTS_DIR = join(process.cwd(), "agents");
const ACTIVE_FILE = join(AGENTS_DIR, ".active");

export async function loadActiveAgentId(): Promise<string> {
  try {
    const content = await readFile(ACTIVE_FILE, "utf-8");
    const id = content.trim();
    if (id) return id;
  } catch {
    // ignore
  }
  return "equiptech-dental";
}

export async function loadActiveAgentConfig(): Promise<AgentConfig | null> {
  try {
    const id = await loadActiveAgentId();
    const content = await readFile(join(AGENTS_DIR, `${id}.json`), "utf-8");
    return JSON.parse(content) as AgentConfig;
  } catch {
    return null;
  }
}

export function loadActiveAgentConfigSync(): AgentConfig | null {
  try {
    const id = readFileSync(ACTIVE_FILE, "utf-8").trim() || "equiptech-dental";
    const content = readFileSync(join(AGENTS_DIR, `${id}.json`), "utf-8");
    return JSON.parse(content) as AgentConfig;
  } catch {
    return null;
  }
}


