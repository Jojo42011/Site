import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Stripe webhook test endpoint is working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    appUrl: process.env.NEXT_PUBLIC_APP_URL
  });
}

export async function POST(request: NextRequest) {
  try {
    const { userId, plan, sessionId } = await request.json();
    
    console.log('Testing subscription flow:', { userId, plan, sessionId });
    
    // Test user profile update
    const { error: userError } = await supabase
      .from('users')
      .update({ 
        subscription_tier: plan,
        subscription_status: 'active',
        selected_bots: ['eve'] // Test with Eve
      })
      .eq('id', userId);
    
    if (userError) {
      console.error('User update test failed:', userError);
      return NextResponse.json({ error: 'User update failed' }, { status: 500 });
    }
    
    // Test subscription creation
    const { error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        stripe_subscription_id: sessionId || 'test_session',
        plan_type: plan,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    
    if (subError) {
      console.error('Subscription creation test failed:', subError);
      return NextResponse.json({ error: 'Subscription creation failed' }, { status: 500 });
    }
    
    console.log('Test completed successfully');
    return NextResponse.json({ success: true, message: 'Test completed' });
    
  } catch (error) {
    console.error('Test failed:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}
