import { createClient } from '@supabase/supabase-js'

// Check if environment variables are available and valid
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isValidKey = (key: string | undefined): boolean => {
  return typeof key === 'string' && key.length > 0
}

// Only create client if environment variables are valid
export const supabase = (isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey))
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabase && isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey))
}

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  company: string
  subscription_tier: 'starter' | 'professional' | 'enterprise'
  subscription_status: 'active' | 'cancelled' | 'past_due'
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  user_id: string
  name: 'scout' | 'eve' | 'shadow'
  status: 'active' | 'paused' | 'error'
  configuration: Record<string, any>
  last_run: string
  performance_metrics: {
    success_rate: number
    response_time: string
    operations_count: number
  }
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  plan_type: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'cancelled' | 'past_due'
  current_period_start: string
  current_period_end: string
  created_at: string
}
