import Stripe from 'stripe';

// Server-side Stripe instance - only create if secret key exists
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    })
  : null;

// Client-side Stripe instance
export const getStripe = async () => {
  const { loadStripe } = await import('@stripe/stripe-js');
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

// Check if Stripe is configured (client-side only)
export const isStripeConfigured = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return !!(publishableKey && publishableKey.length > 0);
};

// Stripe types for our application
export interface StripeSubscription {
  id: string;
  status: 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
  current_period_start: number;
  current_period_end: number;
  trial_end?: number;
  cancel_at_period_end: boolean;
  customer: string;
  items: {
    data: Array<{
      id: string;
      price: {
        id: string;
        unit_amount: number;
        currency: string;
        recurring: {
          interval: 'month' | 'year';
        };
      };
    }>;
  };
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  metadata: {
    user_id?: string;
    company?: string;
  };
}

// Price IDs for our subscription tiers
export const STRIPE_PRICE_IDS = {
  starter: {
    monthly: 'price_1RxvxLGRDGTw7FIEbXo4MKvs',
    yearly: 'price_1RxvxLGRDGTw7FIEbXo4MKvs',
  },
  professional: {
    monthly: 'price_1RxvxLGRDGTw7FIEbXo4MKvs',
    yearly: 'price_1RxvxLGRDGTw7FIEbXo4MKvs',
  },
  enterprise: {
    monthly: 'price_1RxvxLGRDGTw7FIEbXo4MKvs',
    yearly: 'price_1RxvxLGRDGTw7FIEbXo4MKvs',
  },
} as const;

// Plan limits
export const PLAN_LIMITS = {
  starter: {
    agents: 1,
    operations: 1000,
    features: ['Basic Configuration', 'Email Support', 'Standard Analytics'],
  },
  professional: {
    agents: 2,
    operations: 5000,
    features: ['Advanced Configuration', 'Priority Support', 'Advanced Analytics', 'API Access'],
  },
  enterprise: {
    agents: 3,
    operations: -1, // Unlimited
    features: ['Unlimited Configuration', '24/7 Support', 'Enterprise Analytics', 'Full API Access', 'Custom Integrations', 'Admin Access'],
  },
} as const;

export type SubscriptionTier = keyof typeof PLAN_LIMITS;
export type BillingInterval = 'monthly' | 'yearly';
