import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { PLAN_LIMITS, SubscriptionTier } from '@/lib/stripe';

interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  plan_type: SubscriptionTier;
  status: 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
  current_period_start: string;
  current_period_end: string;
  trial_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

interface AgentAccess {
  scout: boolean;
  eve: boolean;
  shadow: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Get agent access based on subscription
  const getAgentAccess = useCallback((): AgentAccess => {
    if (!subscription || subscription.status !== 'active') {
      return { scout: false, eve: false, shadow: false };
    }

    const plan = PLAN_LIMITS[subscription.plan_type];
    
    return {
      scout: subscription.plan_type === 'starter' || subscription.plan_type === 'professional' || subscription.plan_type === 'enterprise',
      eve: subscription.plan_type === 'professional' || subscription.plan_type === 'enterprise',
      shadow: subscription.plan_type === 'enterprise',
    };
  }, [subscription]);

  // Check if user can access a specific agent
  const canAccessAgent = useCallback((agentName: string): boolean => {
    const access = getAgentAccess();
    return access[agentName as keyof AgentAccess] || false;
  }, [getAgentAccess]);

  // Get available agents for user
  const getAvailableAgents = useCallback(() => {
    const access = getAgentAccess();
    return Object.entries(access)
      .filter(([_, hasAccess]) => hasAccess)
      .map(([agentName, _]) => agentName);
  }, [getAgentAccess]);

  // Get subscription status
  const getSubscriptionStatus = useCallback(() => {
    if (!subscription) return 'no_subscription';
    
    if (subscription.status === 'trialing') return 'trial';
    if (subscription.status === 'active') return 'active';
    if (subscription.status === 'past_due') return 'past_due';
    if (subscription.status === 'canceled') return 'canceled';
    
    return subscription.status;
  }, [subscription]);

  // Check if user is admin (enterprise + specific email)
  const isAdmin = useCallback(() => {
    if (!subscription || subscription.status !== 'active') return false;
    if (subscription.plan_type !== 'enterprise') return false;
    
    // Check if user email matches admin email
    return user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || user?.email === 'jahanfraction@gmail.com';
  }, [subscription, user]);

  // Refresh subscription data
  const refreshSubscription = useCallback(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    loading,
    error,
    getAgentAccess,
    canAccessAgent,
    getAvailableAgents,
    getSubscriptionStatus,
    isAdmin,
    refreshSubscription,
  };
}
