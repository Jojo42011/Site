import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'line_items'],
    });

    // Extract plan information from metadata or subscription
    let plan = 'professional'; // default fallback
    
    if (session.metadata?.plan_type) {
      plan = session.metadata.plan_type;
    } else if (session.subscription && typeof session.subscription === 'object') {
      const subscription = session.subscription as any;
      if (subscription.metadata?.plan_type) {
        plan = subscription.metadata.plan_type;
      }
    }

    return NextResponse.json({ 
      plan,
      sessionId: session.id,
      status: session.status,
      customer: session.customer,
      subscription: session.subscription
    });

  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
