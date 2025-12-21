// Simple agent selector component for switching between agents
import { useState, useEffect } from 'react';
import { listAgents, setActiveAgent, getActiveAgentId } from '../lib/agentLoader';

interface Agent {
  id: string;
  name: string;
  description?: string;
}

export default function AgentSelector() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    try {
      const [agentsList, active] = await Promise.all([
        listAgents(),
        getActiveAgentId(),
      ]);
      setAgents(agentsList);
      setActiveId(active);
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSwitch(agentId: string) {
    if (agentId === activeId || switching) return;
    
    setSwitching(true);
    try {
      await setActiveAgent(agentId);
      setActiveId(agentId);
      // Reload page to apply new agent config
      window.location.reload();
    } catch (error) {
      console.error('Failed to switch agent:', error);
      alert('Failed to switch agent. Please try again.');
    } finally {
      setSwitching(false);
    }
  }

  if (loading) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400">Loading agents...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-200 mb-3">Active Agent</h3>
      <div className="space-y-2">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => handleSwitch(agent.id)}
            disabled={switching || agent.id === activeId}
            className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
              agent.id === activeId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            } ${switching ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{agent.name}</div>
                {agent.description && (
                  <div className="text-sm opacity-75">{agent.description}</div>
                )}
              </div>
              {agent.id === activeId && (
                <span className="text-xs bg-blue-500 px-2 py-1 rounded">Active</span>
              )}
            </div>
          </button>
        ))}
      </div>
      {switching && (
        <div className="mt-3 text-sm text-gray-400 text-center">
          Switching agent...
        </div>
      )}
    </div>
  );
}


