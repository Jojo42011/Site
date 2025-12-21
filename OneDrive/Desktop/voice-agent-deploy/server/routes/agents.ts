// API routes for agent management
import { Router } from 'express';
import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import type { AgentConfig } from '../../src/lib/agentTypes';

const router = Router();
const AGENTS_DIR = join(process.cwd(), 'agents');
const ACTIVE_FILE = join(AGENTS_DIR, '.active');

/**
 * Get the active agent ID
 */
router.get('/active', async (_req, res) => {
  try {
    const content = await readFile(ACTIVE_FILE, 'utf-8');
    const agentId = content.trim();
    return res.json({ agentId });
  } catch {
    return res.json({ agentId: 'equiptech-dental' });
  }
});

/**
 * Set the active agent
 */
router.post('/active', async (req, res) => {
  try {
    const { agentId } = req.body;
    if (!agentId || typeof agentId !== 'string') {
      return res.status(400).json({ error: 'agentId is required' });
    }
    
    // Verify agent exists
    const agentPath = join(AGENTS_DIR, `${agentId}.json`);
    try {
      await readFile(agentPath, 'utf-8');
    } catch {
      return res.status(404).json({ error: `Agent ${agentId} not found` });
    }
    
    await writeFile(ACTIVE_FILE, agentId, 'utf-8');
    return res.json({ success: true, agentId });
  } catch (error) {
    console.error('[agents] Error setting active agent:', error);
    return res.status(500).json({ error: 'Failed to set active agent' });
  }
});

/**
 * List all agents
 */
router.get('/', async (_req, res) => {
  try {
    const files = await readdir(AGENTS_DIR);
    const agentFiles = files.filter(f => f.endsWith('.json'));
    
    const agents = await Promise.all(
      agentFiles.map(async (file) => {
        try {
          const content = await readFile(join(AGENTS_DIR, file), 'utf-8');
          const config: AgentConfig = JSON.parse(content);
          return {
            id: config.id,
            name: config.name,
            description: config.description,
          };
        } catch {
          return null;
        }
      })
    );
    
    return res.json(agents.filter(Boolean));
  } catch (error) {
    console.error('[agents] Error listing agents:', error);
    return res.status(500).json({ error: 'Failed to list agents' });
  }
});

/**
 * Get a specific agent configuration
 */
router.get('/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const agentPath = join(AGENTS_DIR, `${agentId}.json`);
    
    const content = await readFile(agentPath, 'utf-8');
    const config: AgentConfig = JSON.parse(content);
    return res.json(config);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return res.status(404).json({ error: `Agent ${req.params.agentId} not found` });
    } else {
      console.error('[agents] Error loading agent:', error);
      return res.status(500).json({ error: 'Failed to load agent' });
    }
  }
});

/**
 * Create or update an agent configuration
 */
router.post('/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    const config: AgentConfig = req.body;
    
    // Validate required fields
    if (!config.id || !config.name || !config.think?.prompt) {
      return res.status(400).json({ error: 'Missing required fields: id, name, think.prompt' });
    }
    
    // Ensure agentId matches
    if (config.id !== agentId) {
      return res.status(400).json({ error: 'Agent ID mismatch' });
    }
    
    // Add timestamps
    const now = new Date().toISOString();
    const agentPath = join(AGENTS_DIR, `${agentId}.json`);
    
    // Check if agent exists to preserve createdAt
    let existingConfig: AgentConfig | null = null;
    try {
      const existing = await readFile(agentPath, 'utf-8');
      existingConfig = JSON.parse(existing);
    } catch {
      // Agent doesn't exist yet, will create new
    }
    
    const updatedConfig: AgentConfig = {
      ...config,
      createdAt: existingConfig?.createdAt || now,
      updatedAt: now,
    };
    
    await writeFile(agentPath, JSON.stringify(updatedConfig, null, 2), 'utf-8');
    return res.json({ success: true, agent: updatedConfig });
  } catch (error) {
    console.error('[agents] Error saving agent:', error);
    return res.status(500).json({ error: 'Failed to save agent' });
  }
});

/**
 * Get knowledge base for an agent
 */
router.get('/:agentId/knowledge-base', async (req, res) => {
  try {
    const { agentId } = req.params;
    const agentPath = join(AGENTS_DIR, `${agentId}.json`);
    
    const content = await readFile(agentPath, 'utf-8');
    const config: AgentConfig = JSON.parse(content);
    
    if (!config.knowledgeBase?.enabled || !config.knowledgeBase?.file) {
      return res.status(404).json({ error: 'Knowledge base not enabled for this agent' });
    }
    
    const kbPath = join(AGENTS_DIR, 'knowledge-bases', config.knowledgeBase.file);
    const kbContent = await readFile(kbPath, 'utf-8');
    
    return res.json({ content: kbContent });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return res.status(404).json({ error: 'Knowledge base file not found' });
    } else {
      console.error('[agents] Error loading knowledge base:', error);
      return res.status(500).json({ error: 'Failed to load knowledge base' });
    }
  }
});

/**
 * Delete an agent (prevent deleting active agent)
 */
router.delete('/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    
    // Check if this is the active agent
    const activeContent = await readFile(ACTIVE_FILE, 'utf-8').catch(() => 'equiptech-dental');
    const activeId = activeContent.trim();
    
    if (agentId === activeId) {
      return res.status(400).json({ error: 'Cannot delete the active agent' });
    }
    
    const agentPath = join(AGENTS_DIR, `${agentId}.json`);
    await readFile(agentPath, 'utf-8'); // Verify exists
    // Note: In production, you might want to actually delete, but for template we'll keep it
    // await unlink(agentPath);
    
    return res.json({ success: true, message: 'Agent marked for deletion (not actually deleted in template)' });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return res.status(404).json({ error: `Agent ${req.params.agentId} not found` });
    } else {
      console.error('[agents] Error deleting agent:', error);
      return res.status(500).json({ error: 'Failed to delete agent' });
    }
  }
});

export default router;


