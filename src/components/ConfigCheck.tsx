'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Settings } from 'lucide-react';

export function ConfigCheck() {
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  const supabaseConfigured = !!(supabaseUrl && supabaseKey);
  const stripeConfigured = !!(stripeKey && stripeSecret);

  const getStatusIcon = (configured: boolean) => {
    if (configured) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusBadge = (configured: boolean) => {
    if (configured) {
      return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Configured</Badge>;
    }
    return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Not Configured</Badge>;
  };

  // If everything is configured, don't show anything
  if (supabaseConfigured && stripeConfigured) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl border-orange-500/30 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Configuration Status
          </CardTitle>
          <CardDescription className="text-slate-400">
            Check the status of your system integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Supabase Status */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(supabaseConfigured)}
              <div>
                <h4 className="font-medium text-white">Supabase Database</h4>
                <p className="text-sm text-slate-400">
                  User authentication and data storage
                </p>
              </div>
            </div>
            {getStatusBadge(supabaseConfigured)}
          </div>

          {/* Stripe Status */}
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(stripeConfigured)}
              <div>
                <h4 className="font-medium text-white">Stripe Payments</h4>
                <p className="text-sm text-slate-400">
                  Subscription management and billing
                </p>
              </div>
            </div>
            {getStatusBadge(stripeConfigured)}
          </div>

          {/* Configuration Instructions */}
          {(!supabaseConfigured || !stripeConfigured) && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-300 mb-2">Configuration Required</h4>
                  <div className="text-sm text-amber-200 space-y-2">
                    {!supabaseConfigured && (
                      <p>
                        • Create a <code className="bg-amber-500/20 px-1 rounded">.env.local</code> file with your Supabase credentials
                      </p>
                    )}
                    {!stripeConfigured && (
                      <p>
                        • Add your Stripe API keys to the <code className="bg-amber-500/20 px-1 rounded">.env.local</code> file
                      </p>
                    )}
                    <p>
                      • Required variables: <code className="bg-amber-500/20 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>, <code className="bg-amber-500/20 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code className="bg-amber-500/20 px-1 rounded">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>, <code className="bg-amber-500/20 px-1 rounded">STRIPE_SECRET_KEY</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
