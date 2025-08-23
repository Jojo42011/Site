// Eve AI Receptionist - Professional Type Definitions
export interface BusinessConfiguration {
  id: string;
  businessName: string;
  businessPhone: string;
  industry: string;
  voiceTone: 'professional' | 'friendly' | 'formal' | 'casual' | 'luxury';
  businessHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
    timezone: string;
    daysOfWeek: number[]; // [1,2,3,4,5] for Mon-Fri
  };
  companyProducts: string[];
  companyServices: string[];
  companyValues: string[];
  complianceSettings: {
    gdprCompliant: boolean;
    hipaaCompliant: boolean;
    pciCompliant: boolean;
    customCompliance: string[];
  };
  escalationRules: {
    urgentKeywords: string[];
    escalationPhone: string;
    escalationEmail: string;
    afterHoursHandling: 'voicemail' | 'emergency' | 'callback';
  };
  customGreetings: {
    morning: string;
    afternoon: string;
    evening: string;
    afterHours: string;
    holiday: string;
  };
  languageSettings: {
    primaryLanguage: string;
    supportedLanguages: string[];
    autoTranslate: boolean;
  };
  aiPersonality: {
    empathyLevel: 'low' | 'medium' | 'high';
    humorLevel: 'none' | 'subtle' | 'moderate';
    formalityLevel: 'casual' | 'semi-formal' | 'formal';
    responseLength: 'concise' | 'detailed' | 'comprehensive';
  };
}

export interface ConversationContext {
  conversationId: string;
  businessId: string;
  customerPhone: string;
  customerName?: string;
  conversationHistory: Message[];
  currentIntent: CustomerIntent;
  customerSentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  conversationStartTime: Date;
  lastActivityTime: Date;
  isResolved: boolean;
  escalationLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
}

export interface Message {
  id: string;
  timestamp: Date;
  sender: 'customer' | 'eve';
  content: string;
  messageType: 'text' | 'voice' | 'image' | 'file';
  sentiment?: 'positive' | 'neutral' | 'negative';
  intent?: CustomerIntent;
  metadata?: Record<string, any>;
}

export interface CustomerIntent {
  primary: IntentType;
  confidence: number;
  entities: Entity[];
  context: string;
  requiresEscalation: boolean;
  suggestedResponse: string;
}

export type IntentType = 
  | 'greeting'
  | 'inquiry'
  | 'appointment_booking'
  | 'complaint'
  | 'pricing_request'
  | 'technical_support'
  | 'general_information'
  | 'escalation'
  | 'goodbye'
  | 'unknown';

export interface Entity {
  type: 'person' | 'date' | 'time' | 'product' | 'service' | 'location' | 'phone' | 'email' | 'amount';
  value: string;
  confidence: number;
  startIndex: number;
  endIndex: number;
}

export interface EveResponse {
  content: string;
  responseType: 'text' | 'voice' | 'action';
  suggestedActions?: SuggestedAction[];
  followUpQuestions?: string[];
  escalationRequired: boolean;
  confidence: number;
  businessContext: string;
  nextBestAction?: string;
}

export interface SuggestedAction {
  type: 'schedule_call' | 'send_info' | 'transfer' | 'callback' | 'escalate';
  label: string;
  value: string;
  priority: 'low' | 'medium' | 'high';
}

export interface BusinessHours {
  isOpen: boolean;
  nextOpenTime?: string;
  currentDaySchedule?: string;
  specialHours?: string;
}

export interface EveConfig {
  aiModel: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'custom';
  maxConversationLength: number;
  responseTimeout: number;
  maxRetries: number;
  enableAnalytics: boolean;
  enableLearning: boolean;
  securityLevel: 'basic' | 'standard' | 'enterprise';
}
