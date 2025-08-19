'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isConfigured: boolean
  signUp: (email: string, password: string, firstName: string, lastName: string, company: string) => Promise<{ error: any } | { error: null, requiresManualSignIn: boolean } | { error: null, user: User }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    // Check if Supabase is configured
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)

    // Only initialize Supabase if it's configured
    if (!configured) {
      console.warn('Supabase is not configured. Please check your environment variables.')
      setLoading(false)
      return
    }

    // Get initial session
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }).catch((error) => {
        console.error('Error getting initial session:', error)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        // Handle specific auth events
        if (event === 'SIGNED_IN' && session?.user) {
          // User just signed in - ensure profile exists
          try {
            const { data: profile, error: profileError } = await supabase!
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            if (profileError && profileError.code === 'PGRST116') {
              // Profile doesn't exist, create it
              await supabase!
                .from('users')
                .insert([
                  {
                    id: session.user.id,
                    email: session.user.email,
                    first_name: session.user.user_metadata?.first_name || 'User',
                    last_name: session.user.user_metadata?.last_name || '',
                    company: session.user.user_metadata?.company || 'Company',
                    subscription_tier: 'starter',
                    subscription_status: 'active',
                  },
                ])
            }
          } catch (profileError) {
            console.error('Profile check error:', profileError)
          }
        }
        
        setLoading(false)
      })

      return () => subscription?.unsubscribe()
    } else {
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string, firstName: string, lastName: string, company: string) => {
    if (!isConfigured || !supabase) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    
    try {
      // Step 1: Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            company: company,
          },
        },
      })

      if (error) {
        return { error }
      }

      if (data.user) {
        try {
          // Step 2: Create the user profile
          const { error: profileError } = await supabase!
            .from('users')
            .insert([
              {
                id: data.user.id,
                first_name: firstName,
                last_name: lastName,
                company,
                subscription_tier: 'starter',
                subscription_status: 'active',
              },
            ])

          if (profileError) {
            console.error('Profile creation error:', profileError)
            console.error('Profile creation details:', {
              id: data.user.id,
              email,
              first_name: firstName,
              last_name: lastName,
              company
            })
            return { error: { message: `Failed to create user profile: ${profileError.message}` } }
          }

          console.log('User profile created successfully for:', data.user.id)

          // Step 3: Create default Scout configuration
          try {
            await supabase!
              .from('scout_configurations')
              .insert([
                {
                  user_id: data.user.id,
                  business_name: company,
                  business_email: email,
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
                  is_active: true,
                },
              ])
          } catch (scoutError) {
            console.error('Scout config creation error:', scoutError)
            // Continue anyway - user can still access dashboard
          }

          // Step 4: Create default Eve configuration
          try {
            await supabase!
              .from('eve_configurations')
              .insert([
                {
                  user_id: data.user.id,
                  business_name: company,
                  business_email: email,
                  business_phone: '',
                  voice_tone: 'professional',
                  operating_hours: '24-7',
                  response_time_priority: 'immediate',
                  calendar_integrations: [],
                  languages: ['English'],
                  is_active: true,
                },
              ])
          } catch (eveError) {
            console.error('Eve config creation error:', eveError)
            // Continue anyway - user can still access dashboard
          }

          // Step 5: Create default subscription (without Stripe for now)
          try {
            // Note: We'll need to handle this differently since the subscriptions table requires stripe_subscription_id
            // For now, we'll skip this and handle it when we implement Stripe
            console.log('Subscription creation skipped - will implement with Stripe integration');
          } catch (subError) {
            console.error('Subscription creation error:', subError)
            // Continue anyway
          }

          // Check if email confirmation is required
          if (data.session) {
            // User is automatically signed in (no email confirmation required)
            setUser(data.user)
            setSession(data.session)
            
            // Double-check that profile was created, if not, try to create it again
            try {
              const { data: profileCheck, error: profileCheckError } = await supabase!
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single()
              
              if (profileCheckError && profileCheckError.code === 'PGRST116') {
                console.log('Profile not found after creation, attempting to create again...')
                // Try to create profile again
                await supabase!
                  .from('users')
                  .insert([
                    {
                      id: data.user.id,
                      first_name: firstName,
                      last_name: lastName,
                      company,
                      subscription_tier: 'starter',
                      subscription_status: 'active',
                    },
                  ])
              }
            } catch (retryError) {
              console.error('Profile retry creation error:', retryError)
            }
            
            return { error: null, user: data.user }
          } else {
            // Email confirmation required
            return { error: null, requiresEmailConfirmation: true }
          }

        } catch (dbError) {
          console.error('Database setup error:', dbError)
          return { error: { message: 'Failed to set up user account. Please contact support.' } }
        }
      }

      return { error: null }
    } catch (error) {
      console.error('Signup error:', error)
      return { error: { message: 'An unexpected error occurred during signup' } }
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!isConfigured || !supabase) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    
    try {
      const { data, error } = await supabase!.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        return { error }
      }
      
      if (data.user) {
        // Check if user profile exists, create if missing
        try {
          const { data: profile, error: profileError } = await supabase!
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single()
          
          if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create it
            console.log('Creating missing profile for user:', data.user.id)
            console.log('User metadata:', data.user.user_metadata)
            
            const { error: createError } = await supabase!
              .from('users')
              .insert([
                {
                  id: data.user.id,
                  first_name: data.user.user_metadata?.first_name || 'User',
                  last_name: data.user.user_metadata?.last_name || '',
                  company: data.user.user_metadata?.company || 'Company',
                  subscription_tier: 'starter',
                  subscription_status: 'active',
                },
              ])
            
            if (createError) {
              console.error('Failed to create missing profile:', createError)
              console.error('Profile creation details:', {
                id: data.user.id,
                email: data.user.email,
                first_name: data.user.user_metadata?.first_name || 'User',
                last_name: data.user.user_metadata?.last_name || '',
                company: data.user.user_metadata?.company || 'Company'
              })
            } else {
              console.log('Profile created successfully during sign in')
            }
          } else if (profile) {
            console.log('Profile found for user:', data.user.id)
          }
        } catch (profileError) {
          console.error('Profile check error:', profileError)
        }
      }
      
      return { error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: { message: 'An unexpected error occurred during sign in' } }
    }
  }

  const signOut = async () => {
    if (!isConfigured || !supabase) {
      return
    }
    await supabase!.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!isConfigured || !supabase) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    
    const { error } = await supabase!.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    isConfigured,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
