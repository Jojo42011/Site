import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface ScoutConfiguration {
  id?: string
  user_id: string
  business_name: string
  business_email: string
  business_phone: string
  scraping_frequency: 'hourly' | 'daily' | 'weekly' | 'monthly'
  outreach_strategy: 'aggressive' | 'moderate' | 'conservative'
  target_addresses: string[]
  industries: string[]
  initial_message: string
  follow_up_message: string
  outreach_keywords: string
  budget: string
  target_size: string[]
  onboardingComplete?: boolean
  is_active: boolean
  created_at?: string
  updated_at?: string
}

const defaultScoutConfig: Omit<ScoutConfiguration, 'user_id'> = {
  business_name: '',
  business_email: '',
  business_phone: '',
  scraping_frequency: 'daily',
  outreach_strategy: 'moderate',
  target_addresses: ['', '', ''],
  industries: ['Internet / Fiber', 'Roofing', 'Solar', 'HVAC'],
  initial_message: 'Hi [Company], I noticed your business in [Industry] and wanted to connect about [Service]. Would you be interested in a quick call to discuss how we can help grow your business?',
  follow_up_message: 'Hi [Name], I wanted to follow up on my previous message. Are you still interested in exploring [Service] opportunities for [Company]?',
  outreach_keywords: 'growth, expansion, efficiency, ROI',
  budget: '$10k-50k',
  target_size: ['10-50', '51-200'],
  onboardingComplete: false,
  is_active: true
}

export function useScoutConfig(user: User | null) {
  const [config, setConfig] = useState<ScoutConfiguration | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchTime, setLastFetchTime] = useState<number>(0)

  // Recovery mechanism for stuck states
  const checkAndRecover = useCallback(() => {
    const now = Date.now()
    const timeSinceFetch = now - lastFetchTime
    
    // If loading for more than 15 seconds, consider it stuck
    if (loading && timeSinceFetch > 15000) {
      console.log('Scout config appears stuck, attempting recovery...')
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
      
      console.log('Fetching Scout config for user:', user.id)

      const { data, error: fetchError } = await supabase
        .from('scout_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single()

      console.log('Scout config fetch result:', { data, error: fetchError })

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw fetchError
      }

      if (data) {
        setConfig(data)
      } else {
        // Create default config for new user
        const newConfig = { ...defaultScoutConfig, user_id: user.id }
        setConfig(newConfig)
      }
    } catch (err) {
      console.error('Error fetching Scout config:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch configuration')
    } finally {
      setLoading(false)
      console.log('Scout config loading finished')
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

  const saveConfig = async (updatedConfig: Partial<ScoutConfiguration>) => {
    if (!user || !config) return

    try {
      setSaving(true)
      setError(null)

      const configToSave = { ...config, ...updatedConfig, user_id: user.id }

      const { data, error: saveError } = await supabase
        .from('scout_configurations')
        .upsert(configToSave)
        .select()
        .single()

      if (saveError) {
        throw saveError
      }

      setConfig(data)
      return { success: true }
    } catch (err) {
      console.error('Error saving Scout config:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to save configuration'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof ScoutConfiguration, value: any) => {
    if (!config) return
    setConfig({ ...config, [field]: value })
  }

  // Onboarding steps for Scout
  const onboardingSteps = [
    {
      id: 'business_name',
      question: "What's your business name?",
      explanation: "I'll use this to personalize outreach messages and identify your business to potential leads.",
      field: 'business_name',
      type: 'text',
      placeholder: 'e.g., ABC Plumbing Services',
      required: true
    },
    {
      id: 'business_email',
      question: "What's your business email address?",
      explanation: "This is where I'll send you qualified leads and campaign reports.",
      field: 'business_email',
      type: 'text',
      placeholder: 'contact@yourbusiness.com',
      required: true
    },
    {
      id: 'business_phone',
      question: "What's your business phone number?",
      explanation: "I'll include this in outreach messages so leads can contact you directly.",
      field: 'business_phone',
      type: 'text',
      placeholder: '(555) 123-4567',
      required: true
    },
    {
      id: 'scraping_frequency',
      question: "How often should I search for new leads?",
      explanation: "This determines how aggressively I'll scan for potential opportunities. Higher frequency means more leads but also more outreach.",
      field: 'scraping_frequency',
      type: 'select',
      options: ['hourly', 'daily', 'weekly', 'monthly'],
      required: true
    },
    {
      id: 'outreach_strategy',
      question: "What's your preferred outreach approach?",
      explanation: "This affects how many leads I'll contact and how quickly. Aggressive means high volume, conservative means high quality.",
      field: 'outreach_strategy',
      type: 'select',
      options: ['aggressive', 'moderate', 'conservative'],
      required: true
    },
    {
      id: 'target_addresses',
      question: "Which locations should I focus on?",
      explanation: "I'll search for businesses in these areas. You can add multiple locations to expand your reach.",
      field: 'target_addresses',
      type: 'addresses',
      required: true
    },
    {
      id: 'industries',
      question: "What industries should I target?",
      explanation: "I'll focus on businesses in these sectors that are most likely to need your services.",
      field: 'industries',
      type: 'multiselect',
      options: ['Internet / Fiber', 'Roofing', 'Solar', 'HVAC', 'Plumbing', 'Electrical', 'Real Estate', 'Construction', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Technology', 'Professional Services'],
      required: true
    },
    {
      id: 'initial_message',
      question: "What should my first outreach message say?",
      explanation: "This is the initial message I'll send to potential leads. Use [Company] and [Industry] as placeholders.",
      field: 'initial_message',
      type: 'textarea',
      placeholder: 'Hi [Company], I noticed your business in [Industry] and wanted to connect about [Service]. Would you be interested in a quick call to discuss how we can help grow your business?',
      required: true
    },
    {
      id: 'follow_up_message',
      question: "What should my follow-up message say?",
      explanation: "This message will be sent if leads don't respond to the initial outreach.",
      field: 'follow_up_message',
      type: 'textarea',
      placeholder: 'Hi [Name], I wanted to follow up on my previous message. Are you still interested in exploring [Service] opportunities for [Company]?',
      required: true
    },
    {
      id: 'outreach_keywords',
      question: "What keywords should I use in my searches?",
      explanation: "These keywords help me identify businesses that are most likely to be interested in your services.",
      field: 'outreach_keywords',
      type: 'keywords',
      required: false
    },
    {
      id: 'budget',
      question: "What's your typical project budget range?",
      explanation: "This helps me qualify leads based on their potential value and your capacity.",
      field: 'budget',
      type: 'select',
      options: ['$1k-5k', '$5k-10k', '$10k-50k', '$50k-100k', '$100k+'],
      required: true
    },
    {
      id: 'target_size',
      question: "What company sizes should I target?",
      explanation: "I'll focus on businesses of this size as they're most likely to have the budget and need for your services.",
      field: 'target_size',
      type: 'multiselect',
      options: ['1-10', '11-50', '51-200', '201-500', '500+'],
      required: true
    }
  ]

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  const currentStep = onboardingSteps[currentStepIndex]
  const totalSteps = onboardingSteps.length
  const progress = ((currentStepIndex + 1) / totalSteps) * 100

  const onNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const onPrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const onSave = (field: string, value: any) => {
    updateField(field as keyof ScoutConfiguration, value)
    saveConfig({ [field]: value })
  }

  const onComplete = () => {
    setOnboardingComplete(true)
    // You can add redirect logic here
  }

  const onBack = () => {
    setOnboardingComplete(false)
    setCurrentStepIndex(0)
  }

  return {
    config,
    loading,
    saving,
    error,
    saveConfig,
    updateField,
    defaultConfig: defaultScoutConfig,
    // Onboarding functions
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    onboardingComplete,
    onNext,
    onPrevious,
    onSave,
    onComplete,
    onBack
  }
}
