import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  company: string
  subscription_tier: 'starter' | 'professional' | 'enterprise'
  subscription_status: 'active' | 'cancelled' | 'past_due'
  selected_bots?: string[] // Array of bot IDs the user selected during setup
  created_at: string
  updated_at: string
}

export function useUserProfile(user: User | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetchTime, setLastFetchTime] = useState<number>(0)

  // Recovery mechanism for stuck states
  const checkAndRecover = useCallback(() => {
    const now = Date.now()
    const timeSinceFetch = now - lastFetchTime
    
    // If loading for more than 15 seconds, consider it stuck
    if (loading && timeSinceFetch > 15000) {
      console.log('User profile appears stuck, attempting recovery...')
      setLoading(false)
      setError('Recovered from stuck state')
      
      // Try to fetch again
      if (user) {
        fetchProfile()
      }
    }
  }, [loading, lastFetchTime, user])

  // Check for stuck states every 5 seconds
  useEffect(() => {
    const interval = setInterval(checkAndRecover, 5000)
    return () => clearInterval(interval)
  }, [checkAndRecover])

  const fetchProfile = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      setLastFetchTime(Date.now())

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (fetchError) {
        throw fetchError
      }

      setProfile(data)
    } catch (err) {
      console.error('Error fetching user profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    fetchProfile()
  }, [user, fetchProfile])

  return { profile, loading, error }
}
