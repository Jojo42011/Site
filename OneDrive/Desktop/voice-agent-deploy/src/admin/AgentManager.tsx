// Agent manager component for editing the active agent in-place (no new agents)
import { useState, useEffect } from 'react';
import { loadActiveAgentConfig } from '../lib/agentLoader';
import type { AgentConfig } from '../lib/agentTypes';

const llmOptions = [
  'gpt-4o-mini',
  'gpt-4o',
  'gpt-4.1',
  'gpt-5.1',
  'gpt-4-turbo',
  'gpt-4',
  'gpt-3.5-turbo',
  'o1-preview',
  'o1-mini',
];
// Complete Aura 2 English voice set for selection
const deepgramVoices = [
  'aura-2-amalthea-en',
  'aura-2-andromeda-en',
  'aura-2-apollo-en',
  'aura-2-arcas-en',
  'aura-2-aries-en',
  'aura-2-asteria-en',
  'aura-2-athena-en',
  'aura-2-atlas-en',
  'aura-2-aurora-en',
  'aura-2-callista-en',
  'aura-2-cora-en',
  'aura-2-cordelia-en',
  'aura-2-delia-en',
  'aura-2-draco-en',
  'aura-2-electra-en',
  'aura-2-harmonia-en',
  'aura-2-helena-en',
  'aura-2-hera-en',
  'aura-2-hermes-en',
  'aura-2-hyperion-en',
  'aura-2-iris-en',
  'aura-2-janus-en',
  'aura-2-juno-en',
  'aura-2-jupiter-en',
  'aura-2-luna-en',
  'aura-2-mars-en',
  'aura-2-minerva-en',
  'aura-2-neptune-en',
  'aura-2-odysseus-en',
  'aura-2-ophelia-en',
  'aura-2-orion-en',
  'aura-2-orpheus-en',
  'aura-2-pandora-en',
  'aura-2-phoebe-en',
  'aura-2-pluto-en',
  'aura-2-saturn-en',
  'aura-2-selene-en',
  'aura-2-thalia-en',
  'aura-2-theia-en',
  'aura-2-vesta-en',
  'aura-2-zeus-en',
];
const deepgramListenModels = ['nova-3', 'nova-2', 'nova-3-medical'];

type SecretsState = {
  deepgramApiKey?: string;
  calendar?: {
    serviceAccountEmail?: string;
    calendarId?: string;
    timeZone?: string;
    privateKey?: string;
  };
};

export default function AgentManager() {
  const [agent, setAgent] = useState<AgentConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [secrets, setSecrets] = useState<SecretsState | null>(null);
  const [secretsSaving, setSecretsSaving] = useState(false);

  useEffect(() => {
    loadActive();
    loadSecretsState();
  }, []);

  async function loadActive() {
    try {
      const config = await loadActiveAgentConfig();
      setAgent(config);
    } catch (error) {
      console.error('Failed to load active agent:', error);
    }
  }

  async function loadSecretsState() {
    try {
      const resp = await fetch('/api/secrets');
      if (!resp.ok) throw new Error('Failed to load secrets');
      const data = await resp.json();
      setSecrets(data);
    } catch (error) {
      console.error('Failed to load secrets:', error);
    }
  }

  async function handleSave() {
    if (!agent) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent, null, 2),
      });
      if (!response.ok) throw new Error('Failed to save agent');
      await loadActive();
      alert('Agent updated');
    } catch (error) {
      console.error('Failed to save agent:', error);
      alert('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSecrets() {
    if (!secrets) return;
    setSecretsSaving(true);
    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(secrets, null, 2),
      });
      if (!response.ok) throw new Error('Failed to save secrets');
      await loadSecretsState();
      alert('Credentials saved');
    } catch (error) {
      console.error('Failed to save secrets:', error);
      alert('Saving credentials failed. Please try again.');
    } finally {
      setSecretsSaving(false);
    }
  }

  const onChange = (partial: Partial<AgentConfig>) => {
    setAgent((prev) => (prev ? { ...prev, ...partial } : prev));
  };

  if (!agent) {
    return (
      <div className="p-6 bg-white min-h-screen text-black flex items-center justify-center" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="text-black/60">Loading active agent…</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen text-black" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ fontWeight: 600 }}>Active Agent</h1>
            <p className="text-black/60 text-sm mt-1">Editing in-place: {agent.id}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-black text-white hover:bg-black/90 rounded-md disabled:opacity-50 transition-colors font-medium"
            style={{ fontWeight: 500 }}
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg p-4 border border-black/10 shadow-sm space-y-3">
            <h2 className="text-lg font-semibold tracking-tight" style={{ fontWeight: 600 }}>Identity</h2>
            <div>
              <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Agent name</label>
              <input
                className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                value={agent.name}
                onChange={(e) => onChange({ name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Greeting</label>
              <input
                className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                value={agent.greeting || ''}
                onChange={(e) => onChange({ greeting: e.target.value })}
              />
            </div>
          </section>

          <section className="bg-white rounded-lg p-4 border border-black/10 shadow-sm space-y-3">
            <h2 className="text-lg font-semibold tracking-tight" style={{ fontWeight: 600 }}>Models</h2>
            <div>
              <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Listen model</label>
              <select
                className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                value={agent.listen.model}
                onChange={(e) =>
                  setAgent({
                    ...agent,
                    listen: { ...agent.listen, model: e.target.value },
                  })
                }
              >
                {deepgramListenModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Speak model (voice)</label>
              <select
                className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                value={agent.voice.model}
                onChange={(e) =>
                  setAgent({
                    ...agent,
                    voice: { ...agent.voice, model: e.target.value },
                  })
                }
              >
                {deepgramVoices.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>LLM model</label>
              <select
                className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                value={agent.think.model}
                onChange={(e) =>
                  setAgent({
                    ...agent,
                    think: { ...agent.think, model: e.target.value },
                  })
                }
              >
                {llmOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Temperature</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1.5"
                className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                value={agent.think.temperature ?? 0}
                onChange={(e) =>
                  setAgent({
                    ...agent,
                    think: { ...agent.think, temperature: Number(e.target.value) },
                  })
                }
              />
            </div>
          </section>
        </div>

        <section className="bg-white rounded-lg p-4 border border-black/10 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold tracking-tight" style={{ fontWeight: 600 }}>System Prompt</h2>
          <textarea
            className="w-full px-3 py-2 bg-white rounded-md border border-black/20 font-mono text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
            rows={16}
            value={agent.think.prompt}
            onChange={(e) =>
              setAgent({
                ...agent,
                think: { ...agent.think, prompt: e.target.value },
              })
            }
          />
        </section>

        <section className="bg-white rounded-lg p-4 border border-black/10 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight" style={{ fontWeight: 600 }}>Credentials (stored server-side)</h2>
            <button
              onClick={handleSaveSecrets}
              disabled={secretsSaving || !secrets}
              className="px-4 py-2 bg-black text-white hover:bg-black/90 rounded-md disabled:opacity-50 transition-colors font-medium"
              style={{ fontWeight: 500 }}
            >
              {secretsSaving ? 'Saving…' : 'Save credentials'}
            </button>
          </div>
          {!secrets ? (
            <div className="text-black/60 text-sm">Loading credentials…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-black" style={{ fontWeight: 600 }}>Deepgram</h3>
                <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>API Key</label>
                <input
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                  value={secrets.deepgramApiKey || ''}
                  onChange={(e) =>
                    setSecrets((prev) => (prev ? { ...prev, deepgramApiKey: e.target.value } : prev))
                  }
                />
                <p className="text-xs text-black/60 mt-1">
                  Deepgram handles both speech-to-text and text-to-speech, and includes OpenAI integration.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-black" style={{ fontWeight: 600 }}>Twilio</h3>
                <div className="bg-black/5 rounded-md p-3 text-sm text-black/80 border border-black/10">
                  <p className="mb-2 font-medium" style={{ fontWeight: 500 }}>To enable phone calls:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>In your Twilio console, go to your phone number settings</li>
                    <li>Set the "A CALL COMES IN" webhook to:</li>
                    <li className="font-mono bg-white px-2 py-1 rounded mt-1 border border-black/20 text-black">
                      https://your-app.fly.dev/twilio/voice
                    </li>
                    <li>Save the configuration</li>
                  </ol>
                  <p className="mt-2 text-xs text-black/60">
                    No credentials needed - Twilio calls your server directly.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-black" style={{ fontWeight: 600 }}>Calendar (Google)</h3>
                <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Service account email</label>
                <input
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                  value={secrets.calendar?.serviceAccountEmail || ''}
                  onChange={(e) =>
                    setSecrets((prev) =>
                      prev
                        ? {
                            ...prev,
                            calendar: { ...(prev.calendar ?? {}), serviceAccountEmail: e.target.value },
                          }
                        : prev,
                    )
                  }
                />
                <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Calendar ID</label>
                <input
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                  value={secrets.calendar?.calendarId || ''}
                  onChange={(e) =>
                    setSecrets((prev) =>
                      prev
                        ? { ...prev, calendar: { ...(prev.calendar ?? {}), calendarId: e.target.value } }
                        : prev,
                    )
                  }
                />
                <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Time zone</label>
                <input
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/20 text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                  value={secrets.calendar?.timeZone || 'America/Chicago'}
                  onChange={(e) =>
                    setSecrets((prev) =>
                      prev
                        ? { ...prev, calendar: { ...(prev.calendar ?? {}), timeZone: e.target.value } }
                        : prev,
                    )
                  }
                />
                <label className="block text-sm font-medium mb-1 text-black/80" style={{ fontWeight: 500 }}>Private key (PEM)</label>
                <textarea
                  className="w-full px-3 py-2 bg-white rounded-md border border-black/20 font-mono text-xs text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/40 transition-all"
                  rows={4}
                  value={secrets.calendar?.privateKey || ''}
                  onChange={(e) =>
                    setSecrets((prev) =>
                      prev
                        ? { ...prev, calendar: { ...(prev.calendar ?? {}), privateKey: e.target.value } }
                        : prev,
                    )
                  }
                />
              </div>
            </div>
          )}
          <p className="text-xs text-black/60">
            Keys are stored on the server (volume-backed). They are not committed to git or baked into the
            frontend bundle.
          </p>
        </section>

        <section className="bg-white rounded-lg p-4 border border-black/10 shadow-sm space-y-2">
          <h2 className="text-lg font-semibold tracking-tight" style={{ fontWeight: 600 }}>Integrations (summary)</h2>
          <div className="text-sm text-black/80">
            <div>Knowledge Base file: {agent.knowledgeBase?.file ?? 'disabled'}</div>
            <div>Calendar: {agent.integrations?.calendar?.enabled ? 'enabled' : 'disabled'}</div>
            <div>Twilio: {agent.integrations?.twilio?.enabled ? 'enabled' : 'disabled'}</div>
          </div>
          <p className="text-xs text-black/60">
            This dashboard edits the active agent only. To manage other personas, clone the repo and
            edit that repo’s active agent.
          </p>
        </section>
      </div>
    </div>
  );
}


