import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { adminEmail, adminPassword } = await request.json();

    // Verify admin credentials
    if (adminEmail !== 'jahanfraction@gmail.com' || adminPassword !== 'Jahan4124') {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Check if admin user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (existingUser) {
      // Update existing user to enterprise
      const { error: updateError } = await supabase
        .from('users')
        .update({
          subscription_tier: 'enterprise',
          subscription_status: 'active',
          selected_bots: ['scout', 'eve', 'shadow'], // Admin gets all bots
        })
        .eq('email', adminEmail);

      if (updateError) {
        throw updateError;
      }

      // Create enterprise subscription
      const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: existingUser.id,
          stripe_subscription_id: 'admin_enterprise',
          stripe_customer_id: 'admin_customer',
          plan_type: 'enterprise',
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          cancel_at_period_end: false,
        });

      if (subError) {
        throw subError;
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Admin user updated to enterprise' 
      });
    }

    // Create new admin user
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        email: adminEmail,
        first_name: 'Jahan',
        last_name: 'Admin',
        company: 'Aethon Admin',
        subscription_tier: 'enterprise',
        subscription_status: 'active',
        selected_bots: ['scout', 'eve', 'shadow'], // Admin gets all bots
      })
      .select()
      .single();

    if (userError) {
      throw userError;
    }

    // Create enterprise subscription
    const { error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: newUser.id,
        stripe_subscription_id: 'admin_enterprise',
        stripe_customer_id: 'admin_customer',
        plan_type: 'enterprise',
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false,
      });

    if (subError) {
      throw subError;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created with enterprise access' 
    });

  } catch (error) {
    console.error('Error setting up admin:', error);
    return NextResponse.json(
      { error: 'Failed to setup admin user' },
      { status: 500 }
    );
  }
}
