// Agent loader utility - loads agent configs from the agents/ folder
import type { AgentConfig } from './agentTypes';
import type { StsConfig } from '../utils/deepgramUtils';
import { calendarFunctions, knowledgeBaseFunction } from './constants';

/**
 * Get the currently active agent ID
 */
export async function getActiveAgentId(): Promise<string> {
  try {
    const response = await fetch('/api/agents/active');
    if (!response.ok) {
      // Default to 'chloe' if no active agent set
      return 'equiptech-dental';
    }
    const data = await response.json();
    return data.agentId || 'equiptech-dental';
  } catch {
    return 'equiptech-dental';
  }
}

/**
 * Load an agent configuration by ID
 */
export async function loadAgentConfig(agentId: string): Promise<AgentConfig> {
  const response = await fetch(`/api/agents/${agentId}`);
  if (!response.ok) {
    throw new Error(`Failed to load agent ${agentId}: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Load the currently active agent configuration
 */
export async function loadActiveAgentConfig(): Promise<AgentConfig> {
  const agentId = await getActiveAgentId();
  return await loadAgentConfig(agentId);
}

/**
 * Convert AgentConfig to StsConfig format for Deepgram
 */
export function agentConfigToStsConfig(agentConfig: AgentConfig): StsConfig {
  const customFunctions = (agentConfig.functions ?? []) as any[];

  return {
    type: 'Settings',
    experimental: false,
    mip_opt_out: false,
    audio: {
      input: {
        encoding: 'linear16',
        sample_rate: 16000,
      },
      output: {
        encoding: 'linear16',
        sample_rate: 24000,
        container: 'none',
      },
    },
    agent: {
      language: 'en',
      listen: {
        provider: {
          type: agentConfig.listen.provider,
          model: agentConfig.listen.model,
        },
      },
      think: {
        provider: {
          type: agentConfig.think.provider,
        model: agentConfig.think.model,
        ...(agentConfig.think.temperature !== undefined && {
          temperature: agentConfig.think.temperature,
        }),
      },
        prompt: agentConfig.think.prompt,
        ...(agentConfig.think.instructions && {
          instructions: agentConfig.think.instructions,
        }),
        // Merge agent-specific functions with built-in functions
        functions: [
          ...(agentConfig.integrations?.calendar?.enabled ? calendarFunctions : []),
          ...(agentConfig.knowledgeBase?.enabled ? [knowledgeBaseFunction] : []),
          ...customFunctions,
        ] as any,
      },
      speak: {
        provider: {
          type: agentConfig.voice.provider,
          model: agentConfig.voice.model,
        },
      },
      ...(agentConfig.greeting && {
        greeting: agentConfig.greeting,
      }),
    },
  };
}

/**
 * List all available agents
 */
export async function listAgents(): Promise<Array<{ id: string; name: string; description?: string }>> {
  const response = await fetch('/api/agents');
  if (!response.ok) {
    return [];
  }
  return await response.json();
}

/**
 * Set the active agent
 */
export async function setActiveAgent(agentId: string): Promise<void> {
  const response = await fetch('/api/agents/active', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentId }),
  });
  if (!response.ok) {
    throw new Error(`Failed to set active agent: ${response.statusText}`);
  }
}


