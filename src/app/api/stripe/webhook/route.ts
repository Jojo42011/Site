import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Headers:', Object.fromEntries(request.headers.entries()));
  
  // Check if Stripe is configured
  if (!isStripeConfigured() || !stripe) {
    console.error('Stripe not configured in webhook');
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    );
  }
  
  console.log('Stripe is configured, processing webhook...');

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }
    
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    console.log('Processing event type:', event.type);
    
    switch (event.type) {
      case 'customer.subscription.created':
        console.log('Handling subscription created');
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('=== HANDLING SUBSCRIPTION CREATED ===');
  console.log('Subscription ID:', subscription.id);
  console.log('Subscription metadata:', subscription.metadata);
  console.log('Customer ID:', subscription.customer);
  console.log('Status:', subscription.status);
  
  const { user_id, company, plan_type } = subscription.metadata;
  
  if (!user_id) {
    console.error('No user_id in subscription metadata');
    console.error('Available metadata keys:', Object.keys(subscription.metadata));
    return;
  }
  
  console.log('Creating subscription for user:', user_id, 'with plan:', plan_type);

  // Use plan_type from metadata, fallback to starter if not specified
  let tier: 'starter' | 'professional' | 'enterprise' = (plan_type as any) || 'starter';

  // Create subscription record
  const { error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user_id,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      plan_type: tier,
      status: subscription.status,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      trial_end: (subscription as any).trial_end ? new Date((subscription as any).trial_end * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
    });

  if (error) {
    console.error('Error creating subscription record:', error);
  }

  // Update user profile
  await supabase
    .from('users')
    .update({ 
      subscription_tier: tier,
      subscription_status: subscription.status === 'trialing' ? 'active' : subscription.status
    })
    .eq('id', user_id);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { user_id } = subscription.metadata;
  
  if (!user_id) return;

  // Update subscription record
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      trial_end: (subscription as any).trial_end ? new Date((subscription as any).trial_end * 1000).toISOString() : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription record:', error);
  }

  // Update user profile
  await supabase
    .from('users')
    .update({ subscription_status: subscription.status })
    .eq('id', user_id);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { user_id } = subscription.metadata;
  
  if (!user_id) return;

  // Update subscription status
  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription status:', error);
  }

  // Update user profile
  await supabase
    .from('users')
    .update({ subscription_status: 'cancelled' })
    .eq('id', user_id);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if ((invoice as any).subscription) {
    // Update subscription status to active
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'active' })
      .eq('stripe_subscription_id', (invoice as any).subscription as string);

    if (error) {
      console.error('Error updating subscription status:', error);
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if ((invoice as any).subscription) {
    // Update subscription status to past_due
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'past_due' })
      .eq('stripe_subscription_id', (invoice as any).subscription as string);

    if (error) {
      console.error('Error updating subscription status:', error);
    }
  }
}
