import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface EveConfiguration {
  id?: string
  user_id: string
  business_name: string
  business_email: string
  business_phone: string
  company_industry: string
  company_industry_custom?: string
  voice_tone: 'professional' | 'friendly' | 'casual' | 'enthusiastic' | 'empathetic' | 'authoritative' | 'consultative' | 'technical' | 'sales-oriented' | 'support-focused'
  operating_hours: '24-7' | 'business-hours' | 'extended-hours' | 'custom'
  custom_operating_hours?: string
  company_products: string
  company_services: string
  appointment_booking_enabled: boolean
  calendar_integrations: string[] // JSONB array for calendar details
  calendar_setup_instructions?: string
  service_territories?: string
  website_chat_widget_key?: string
  emergency_contact?: string
  compliance_guardrails: string[]
  compliance_scripts?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

interface OnboardingStep {
  id: string
  question: string
  explanation: string
  field: keyof EveConfiguration
  type: 'text' | 'select' | 'multiselect' | 'textarea' | 'boolean'
  options?: string[]
  placeholder?: string
  required: boolean
  dependsOn?: { field: keyof EveConfiguration; value: any }
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'business_name',
    question: "What's your business name?",
    explanation: "This helps me introduce myself properly to your customers and represent your brand accurately.",
    field: 'business_name',
    type: 'text',
    placeholder: 'e.g., ABC Plumbing Services',
    required: true
  },
  {
    id: 'business_email',
    question: "What's your business email address?",
    explanation: "I'll use this to forward urgent customer inquiries and schedule follow-ups when needed.",
    field: 'business_email',
    type: 'text',
    placeholder: 'contact@yourbusiness.com',
    required: true
  },
  {
    id: 'business_phone',
    question: "What's your business phone number?",
    explanation: "This allows me to provide customers with your contact information and handle phone-related inquiries.",
    field: 'business_phone',
    type: 'text',
    placeholder: '(555) 123-4567',
    required: true
  },
  {
    id: 'company_industry',
    question: "What industry are you in?",
    explanation: "This helps me understand your business context and provide more relevant, industry-specific responses to customers.",
    field: 'company_industry',
    type: 'select',
    options: ['internet_fiber', 'roofing', 'hvac', 'solar', 'plumbing', 'electrical', 'real_estate', 'construction', 'healthcare', 'finance', 'retail', 'other'],
    required: true
  },
  {
    id: 'voice_tone',
    question: "How should I communicate with your customers?",
    explanation: "This determines my communication style - whether I should be formal and professional, friendly and approachable, or something else that matches your brand.",
    field: 'voice_tone',
    type: 'select',
    options: ['professional', 'friendly', 'casual', 'enthusiastic', 'empathetic', 'authoritative', 'consultative', 'technical', 'sales-oriented', 'support-focused'],
    required: true
  },
  {
    id: 'operating_hours',
    question: "What are your operating hours?",
    explanation: "This helps me inform customers about your availability and handle after-hours inquiries appropriately.",
    field: 'operating_hours',
    type: 'select',
    options: ['24-7', 'business-hours', 'extended-hours', 'custom'],
    required: true
  },
  {
    id: 'custom_operating_hours',
    question: "Please describe your custom operating schedule.",
    explanation: "I'll use this detailed schedule to accurately inform customers about your availability and set proper expectations.",
    field: 'custom_operating_hours',
    type: 'textarea',
    placeholder: 'e.g., Monday-Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 3:00 PM\nSunday: Closed',
    required: false,
    dependsOn: { field: 'operating_hours', value: 'custom' }
  },
  {
    id: 'company_products',
    question: "What products or services do you offer?",
    explanation: "This helps me understand your offerings so I can answer customer questions about your products and services accurately.",
    field: 'company_products',
    type: 'text',
    placeholder: 'e.g., Fiber Internet, WiFi Installation, Network Security',
    required: true
  },
  {
    id: 'company_services',
    question: "What specific services do you provide?",
    explanation: "This allows me to explain your service capabilities to customers and help them understand what you can do for them.",
    field: 'company_services',
    type: 'text',
    placeholder: 'e.g., Installation, Maintenance, Repair, Consultation, Emergency Service',
    required: true
  },
  {
    id: 'appointment_booking_enabled',
    question: "Would you like me to help customers book appointments?",
    explanation: "If enabled, I can help customers schedule appointments and integrate with your calendar system for seamless booking.",
    field: 'appointment_booking_enabled',
    type: 'boolean',
    required: false
  },
  {
    id: 'service_territories',
    question: "What areas do you serve?",
    explanation: "This helps me confirm to customers whether you provide service in their location and manage their expectations about coverage areas.",
    field: 'service_territories',
    type: 'text',
    placeholder: 'e.g., Austin, TX, Houston, TX, Dallas, TX',
    required: false
  },
  {
    id: 'website_chat_widget_key',
    question: "Do you have a website chat widget you'd like me to integrate with?",
    explanation: "If you use platforms like Intercom, Drift, or Zendesk, I can integrate with them for a seamless customer experience.",
    field: 'website_chat_widget_key',
    type: 'text',
    placeholder: 'Enter your chat widget integration key (optional)',
    required: false
  },
  {
    id: 'emergency_contact',
    question: "What should I do in emergency situations?",
    explanation: "This helps me handle urgent customer requests appropriately, whether it's providing emergency contact info or following specific procedures.",
    field: 'emergency_contact',
    type: 'text',
    placeholder: 'Emergency contact number or procedure',
    required: false
  },
  {
    id: 'compliance_guardrails',
    question: "Are there topics I should avoid discussing?",
    explanation: "This ensures I stay within compliance boundaries and don't discuss topics that could create legal or regulatory issues for your business.",
    field: 'compliance_guardrails',
    type: 'multiselect',
    options: ['financial_advice', 'medical_advice', 'legal_advice', 'pricing_quotes', 'contract_negotiations', 'payment_processing', 'personal_information', 'technical_specifications'],
    required: false
  },
  {
    id: 'compliance_scripts',
    question: "How should I respond when customers ask about restricted topics?",
    explanation: "This gives me specific scripts to use when customers ask about topics I'm not allowed to discuss, ensuring consistent and professional responses.",
    field: 'compliance_scripts',
    type: 'textarea',
    placeholder: 'e.g., "I cannot provide pricing quotes, but I can connect you with our sales team who can help with that."',
    required: false
  }
]

const defaultEveConfig: Omit<EveConfiguration, 'user_id'> = {
  business_name: '',
  business_email: '',
  business_phone: '',
  company_industry: '',
  company_industry_custom: '',
  voice_tone: 'professional',
  operating_hours: '24-7',
  custom_operating_hours: '',
  company_products: '',
  company_services: '',
  appointment_booking_enabled: false,
  calendar_integrations: [],
  calendar_setup_instructions: '',
  service_territories: '',
  website_chat_widget_key: '',
  emergency_contact: '',
  compliance_guardrails: ['financial_advice', 'medical_advice', 'legal_advice'],
  compliance_scripts: '',
  is_active: true
}

export function useEveConfig(user: User | null) {
  const [config, setConfig] = useState<EveConfiguration | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchTime, setLastFetchTime] = useState<number>(0)
  
  // Conversational onboarding state
  const [onboardingMode, setOnboardingMode] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  // Recovery mechanism for stuck states
  const checkAndRecover = useCallback(() => {
    const now = Date.now()
    const timeSinceFetch = now - lastFetchTime
    
    // If loading for more than 15 seconds, consider it stuck
    if (loading && timeSinceFetch > 15000) {
      console.log('Eve config appears stuck, attempting recovery...')
      setLoading(false)
      setError('Recovered from stuck state')
      
      // Try to fetch again
      if (user) {
        fetchConfig()
      }
    }
  }, [loading, lastFetchTime, user])

  // Check for stuck states every 5 seconds
  useEffect(() => {
    const interval = setInterval(checkAndRecover, 5000)
    return () => clearInterval(interval)
  }, [checkAndRecover])

  const fetchConfig = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      setLastFetchTime(Date.now())
      
      console.log('Fetching Eve config for user:', user.id)

      const { data, error: fetchError } = await supabase
        .from('eve_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single()

      console.log('Eve config fetch result:', { data, error: fetchError })

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw fetchError
      }

      if (data) {
        setConfig(data)
        // Check if onboarding is complete
        const hasRequiredFields = data.business_name && data.business_email && data.business_phone
        setOnboardingComplete(hasRequiredFields)
      } else {
        // Create default config for new user
        const newConfig = { ...defaultEveConfig, user_id: user.id }
        setConfig(newConfig)
        setOnboardingComplete(false)
      }
    } catch (err) {
      console.error('Error fetching Eve config:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch configuration')
    } finally {
      setLoading(false)
      console.log('Eve config loading finished')
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setConfig(null)
      setLoading(false)
      return
    }

    fetchConfig()
  }, [user, fetchConfig])

  const saveConfig = async (updatedConfig: Partial<EveConfiguration>) => {
    if (!user || !config) return

    try {
      setSaving(true)
      setError(null)

      const configToSave = { ...config, ...updatedConfig, user_id: user.id }

      const { data, error: saveError } = await supabase
        .from('eve_configurations')
        .upsert(configToSave)
        .select()
        .single()

      if (saveError) {
        throw saveError
      }

      setConfig(data)
      return { success: true }
    } catch (err) {
      console.error('Error saving Eve config:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to save configuration'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof EveConfiguration, value: any) => {
    if (!config) return
    setConfig({ ...config, [field]: value })
  }

  const updateCalendarIntegration = (calendarType: string, details: any) => {
    if (!config) return
    
    const existingIntegrations = config.calendar_integrations || []
    const existingIndex = existingIntegrations.findIndex((item: any) => item.type === calendarType)
    
    let newIntegrations
    if (existingIndex >= 0) {
      newIntegrations = [...existingIntegrations]
      newIntegrations[existingIndex] = { ...newIntegrations[existingIndex], ...details }
    } else {
      newIntegrations = [...existingIntegrations, { type: calendarType, ...details }]
    }
    
    setConfig({ ...config, calendar_integrations: newIntegrations })
  }

  const removeCalendarIntegration = (calendarType: string) => {
    if (!config) return
    
    const newIntegrations = (config.calendar_integrations || []).filter(
      (item: any) => item.type !== calendarType
    )
    
    setConfig({ ...config, calendar_integrations: newIntegrations })
  }

  // Conversational onboarding methods
  const startOnboarding = () => {
    setOnboardingMode(true)
    setCurrentStepIndex(0)
  }

  const nextStep = () => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      setOnboardingComplete(true)
      setOnboardingMode(false)
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const getCurrentStep = () => {
    return onboardingSteps[currentStepIndex]
  }

  const getProgress = () => {
    return ((currentStepIndex + 1) / onboardingSteps.length) * 100
  }





  return {
    config,
    loading,
    saving,
    error,
    saveConfig,
    updateField,
    updateCalendarIntegration,
    removeCalendarIntegration,
    defaultConfig: defaultEveConfig,
    // Conversational onboarding
    onboardingMode,
    onboardingComplete,
    currentStepIndex,
    startOnboarding,
    nextStep,
    previousStep,
    getCurrentStep,
    getProgress,
    onboardingSteps
  }
}
