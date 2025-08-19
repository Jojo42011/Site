import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface EveConfiguration {
  id?: string
  user_id: string
  business_name: string
  business_email: string
  business_phone: string
  voice_tone: 'professional' | 'friendly' | 'casual' | 'enthusiastic' | 'empathetic'
  operating_hours: '24-7' | 'business-hours' | 'extended-hours' | 'custom'
  response_time_priority: 'immediate' | 'fast' | 'standard' | 'relaxed'
  calendar_integrations: any[] // JSONB array for calendar details
  languages: string[]
  is_active: boolean
  created_at?: string
  updated_at?: string
}

const defaultEveConfig: Omit<EveConfiguration, 'user_id'> = {
  business_name: '',
  business_email: '',
  business_phone: '',
  voice_tone: 'professional',
  operating_hours: '24-7',
  response_time_priority: 'immediate',
  calendar_integrations: [],
  languages: ['English'],
  is_active: true
}

export function useEveConfig(user: User | null) {
  const [config, setConfig] = useState<EveConfiguration | null>(null)
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
      } else {
        // Create default config for new user
        const newConfig = { ...defaultEveConfig, user_id: user.id }
        setConfig(newConfig)
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

  return {
    config,
    loading,
    saving,
    error,
    saveConfig,
    updateField,
    updateCalendarIntegration,
    removeCalendarIntegration,
    defaultConfig: defaultEveConfig
  }
}
