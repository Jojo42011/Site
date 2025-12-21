import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App.jsx'
import AdminDashboard from './components/AdminDashboard'
import './styles/globals.css'
import { loadActiveAgentConfig, agentConfigToStsConfig } from './lib/agentLoader'
import { initializeKnowledgeBase } from './lib/knowledgeBase'
import { stsConfig as originalStsConfig } from './lib/constants'
import type { StsConfig } from './utils/deepgramUtils'
import { VoiceBotProvider } from './context/VoiceBotContextProvider'
import { MicrophoneContextProvider } from './context/MicrophoneContextProvider'
import { DeepgramContextProvider } from './context/DeepgramContextProvider'

// Fallback config if agent loading fails
const fallbackConfig: StsConfig = {
  type: 'Settings',
  experimental: false,
  mip_opt_out: false,
  audio: {
    input: { encoding: 'linear16', sample_rate: 16000 },
    output: { encoding: 'linear16', sample_rate: 24000, container: 'none' },
  },
  agent: {
    language: 'en',
    listen: { provider: { type: 'deepgram', model: 'nova-3' } },
    think: {
      provider: { type: 'open_ai', model: 'gpt-4o-mini' },
      temperature: 0.7,
      prompt: 'You are a helpful assistant.',
    },
    speak: { provider: { type: 'deepgram', model: 'aura-2-vesta-en' } },
  },
}

function Root() {
  const [stsConfig, setStsConfig] = useState<StsConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const isDemo = window.location.pathname === '/demo'

  useEffect(() => {
    // Skip loading agent if we're on admin page
    if (!isDemo) {
      setLoading(false)
      return
    }

    async function loadAgent() {
      try {
        const agentConfig = await loadActiveAgentConfig()
        
        // Load knowledge base if enabled
        if (agentConfig.knowledgeBase?.enabled) {
          await initializeKnowledgeBase(agentConfig.id)
        }
        
        const config = agentConfigToStsConfig(agentConfig)
        setStsConfig(config)
      } catch (error) {
        console.error('Failed to load agent config, using original config:', error)
        // Use original stsConfig as fallback instead of minimal fallback
        setStsConfig(originalStsConfig)
      } finally {
        setLoading(false)
      }
    }
    loadAgent()
  }, [isDemo])

  // Default to dashboard for all routes except /demo
  if (!isDemo) {
    return (
      <React.StrictMode>
        <AdminDashboard />
      </React.StrictMode>
    )
  }

  if (loading || !stsConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200 mx-auto mb-4"></div>
          <p>Loading agent configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <React.StrictMode>
      <DeepgramContextProvider>
        <MicrophoneContextProvider>
          <VoiceBotProvider>
            <App defaultStsConfig={stsConfig} />
          </VoiceBotProvider>
        </MicrophoneContextProvider>
      </DeepgramContextProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
