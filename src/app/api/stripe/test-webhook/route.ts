import { NextRequest, NextResponse } from 'next/server';

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
