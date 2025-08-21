import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { STRIPE_PRICE_IDS } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('Creating checkout session...');
    
    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      console.error('Stripe not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const { priceId, billingInterval, userId, userEmail, userName, company, plan } = await request.json();
    console.log('Request data:', { priceId, billingInterval, userId, userEmail, userName, company, plan });
    
    // Validate plan parameter
    if (!plan || plan === '') {
      console.error('Plan parameter is missing or empty');
      return NextResponse.json(
        { error: 'Plan parameter is required' },
        { status: 400 }
      );
    }

    if (!priceId || !billingInterval || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate price ID
    const validPriceIds = Object.values(STRIPE_PRICE_IDS).flatMap(interval => Object.values(interval));
    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      );
    }

    // Check if user already has an active subscription
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      );
    }

    // Create or retrieve Stripe customer
    let customer;
    const { data: existingCustomer } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .not('stripe_customer_id', 'is', null)
      .single();

    if (existingCustomer?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(existingCustomer.stripe_customer_id);
    } else {
      customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: {
          user_id: userId,
          company: company || '',
        },
      });
    }

    console.log('Creating Stripe checkout session with customer:', customer.id);
    
    // Create success URL with plan parameter
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/success?success=true&session_id={CHECKOUT_SESSION_ID}&plan=${plan}`;
    console.log('Success URL:', successUrl);
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          user_id: userId,
          company: company || '',
          plan_type: plan,
        },
      },
      metadata: {
        user_id: userId,
        company: company || '',
        plan_type: plan,
      },
    });
    
    console.log('Checkout session created:', session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
