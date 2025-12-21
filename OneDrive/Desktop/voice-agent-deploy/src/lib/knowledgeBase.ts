// Dynamic knowledge base loader - loads KB based on active agent
let cachedKb: string | null = null;
let cachedAgentId: string | null = null;

/**
 * Load knowledge base for the active agent
 */
export async function loadKnowledgeBase(agentId: string): Promise<string> {
  // Return cached if same agent
  if (cachedKb && cachedAgentId === agentId) {
    return cachedKb;
  }

  try {
    const response = await fetch(`/api/agents/${agentId}/knowledge-base`);
    if (!response.ok) {
      // Return empty string if KB not found or not enabled
      return '';
    }
    const data = await response.json();
    cachedKb = data.content || '';
    cachedAgentId = agentId;
    return cachedKb;
  } catch (error) {
    console.error('Failed to load knowledge base:', error);
    return '';
  }
}

/**
 * Get knowledge base text (for backward compatibility)
 * This will be loaded dynamically when the agent is initialized
 */
export let KNOWLEDGE_BASE_TEXT = '';

/**
 * Initialize knowledge base for an agent
 */
export async function initializeKnowledgeBase(agentId: string): Promise<void> {
  KNOWLEDGE_BASE_TEXT = await loadKnowledgeBase(agentId);
  // Refresh KB chunks after loading
  const { refreshKbChunks } = await import('./kbSearch');
  refreshKbChunks();
}


