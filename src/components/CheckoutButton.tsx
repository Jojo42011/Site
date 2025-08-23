'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { STRIPE_PRICE_IDS, PLAN_LIMITS, SubscriptionTier, BillingInterval, isStripeConfigured } from '@/lib/stripe';
import { Loader2, CreditCard, Sparkles, Zap, Crown } from 'lucide-react';

interface CheckoutButtonProps {
  plan: SubscriptionTier;
  billingInterval: BillingInterval;
  className?: string;
}

const planIcons = {
  starter: Sparkles,
  professional: Zap,
  enterprise: Crown,
};

const planColors = {
  starter: 'bg-emerald-500 hover:bg-emerald-600',
  professional: 'bg-orange-500 hover:bg-orange-600',
  enterprise: 'bg-purple-500 hover:bg-purple-600',
};

export function CheckoutButton({ plan, billingInterval, className }: CheckoutButtonProps) {
  const { user } = useAuth();
  const { subscription, loading: subLoading } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    if (!isStripeConfigured()) {
      alert('Payment system is not configured. Please contact support.');
      return;
    }

    if (subscription?.status === 'active') {
      // Redirect to customer portal for existing subscribers
      try {
        const response = await fetch('/api/stripe/manage-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error('Error redirecting to customer portal:', error);
      }
      return;
    }

    setIsLoading(true);

    try {
      const priceId = STRIPE_PRICE_IDS[plan][billingInterval];
      
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          billingInterval,
          userId: user.id,
          userEmail: user.email,
          userName: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim(),
          company: user.user_metadata?.company || '',
          plan,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      const stripe = await import('@stripe/stripe-js').then(m => m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));
      if (stripe) {
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
          throw stripeError;
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    // If no user, show sign up text
    if (!user) {
      return `Get Started - ${billingInterval === 'monthly' ? 'Monthly' : 'Annual'}`;
    }
    
    if (subLoading) return 'Loading...';
    
    if (subscription?.status === 'active') {
      if (subscription.plan_type === plan) {
        return 'Current Plan';
      } else {
        return 'Manage Subscription';
      }
    }

    return `Start ${billingInterval === 'monthly' ? 'Monthly' : 'Annual'} Plan`;
  };

  const isCurrentPlan = subscription?.status === 'active' && subscription.plan_type === plan;
  const canUpgrade = subscription?.status === 'active' && subscription.plan_type !== plan;

  const IconComponent = planIcons[plan];
  const buttonColor = isCurrentPlan ? 'bg-slate-600 cursor-not-allowed' : planColors[plan];

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || (user && subLoading) || (user && isCurrentPlan)}
      className={`w-full py-3 text-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${buttonColor} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <IconComponent className="h-5 w-5 mr-2" />
          {getButtonText()}
        </>
      )}
    </Button>
  );
}
