// Agent configuration types for the template system

export interface AgentConfig {
  id: string;                    // Unique identifier (e.g., "chloe", "dental")
  name: string;                  // Display name
  description?: string;          // Optional description
  
  // Voice Configuration
  voice: {
    provider: 'deepgram' | 'elevenlabs';
    model: string;               // e.g., "aura-2-vesta-en"
  };
  
  // STT Configuration
  listen: {
    provider: 'deepgram';
    model: string;               // e.g., "nova-3"
  };
  
  // LLM Configuration
  think: {
    provider: 'open_ai' | 'anthropic';
    model: string;               // e.g., "gpt-4o-mini"
    temperature: number;
    prompt: string;              // Main system prompt
    instructions?: string;        // Additional instructions
  };
  
  // Function Definitions (will be merged with built-in functions)
  functions?: Array<{
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, any>;
      required?: string[];
    };
  }>;
  
  // Knowledge Base
  knowledgeBase?: {
    enabled: boolean;
    file?: string;               // Path to KB file relative to agents/knowledge-bases/
  };
  
  // Integrations
  integrations?: {
    calendar?: {
      enabled: boolean;
      provider: 'google';
      config?: {
        serviceAccountEmail?: string;
        privateKey?: string;
        calendarId?: string;
        timeZone?: string;
      };
    };
    crm?: {
      enabled: boolean;
      provider?: string;
      config?: Record<string, any>;
    };
    twilio?: {
      enabled?: boolean;
      accountSid?: string;
      authToken?: string;
      phoneNumber?: string;
      publicBaseUrl?: string;
      wsPath?: string;
      bufferFrames?: number;
    };
  };
  
  // Greeting
  greeting?: string;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

// Active agent info stored in .active file
export interface ActiveAgent {
  agentId: string;
  lastSwitched: string;
}


