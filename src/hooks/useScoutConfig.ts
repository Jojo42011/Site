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

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      })

      const fetchPromise = supabase
        .from('scout_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single()

      const result = await Promise.race([fetchPromise, timeoutPromise])
      const { data, error: fetchError } = result

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

  return {
    config,
    loading,
    saving,
    error,
    saveConfig,
    updateField,
    defaultConfig: defaultScoutConfig
  }
}
