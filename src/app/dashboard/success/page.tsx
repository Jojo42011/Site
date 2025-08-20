"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion as m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  CheckCircle2, Sparkles, Zap, Crown, ArrowRight, 
  Bot, Users, BarChart3, Loader2
} from "lucide-react";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => ({ default: mod.Player })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-700/30 rounded-full animate-pulse" />
});

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const sessionId = searchParams.get('session_id');
  const isSuccess = searchParams.get('success') === 'true';
  const plan = searchParams.get('plan') || 'professional';
  
  // Plan-based bot limits
  const planLimits = {
    starter: 1,
    professional: 2,
    enterprise: 3
  };
  
  const maxBots = planLimits[plan as keyof typeof planLimits] || 2;

  // Redirect if not coming from Stripe success
  useEffect(() => {
    if (!isSuccess || !sessionId) {
      router.push('/dashboard');
    }
  }, [isSuccess, sessionId, router]);

  const bots = [
    {
      id: 'scout',
      name: 'Scout',
      description: 'Lead Intelligence Specialist',
      lottie: '/assets/scout.json',
      color: 'emerald',
      features: ['Lead Generation', 'Market Intelligence', 'Automated Outreach']
    },
    {
      id: 'eve',
      name: 'Eve', 
      description: 'Customer Service Specialist',
      lottie: '/assets/Nova.json',
      color: 'pink',
      features: ['24/7 Support', 'Multi-language', 'Issue Resolution']
    },
    {
      id: 'shadow',
      name: 'Shadow',
      description: 'Workflow Automation Specialist', 
      lottie: '/assets/shadow.json',
      color: 'purple',
      features: ['Process Automation', 'Data Analytics', 'Workflow Optimization']
    }
  ];

  const handleBotSelection = (botId: string) => {
    setSelectedBots(prev => {
      if (prev.includes(botId)) {
        return prev.filter(id => id !== botId);
      } else if (prev.length < maxBots) {
        return [...prev, botId];
      }
      return prev;
    });
  };

  const handleCompleteSetup = async () => {
    if (!user || selectedBots.length === 0) return;
    
    setIsUpdating(true);
    
    try {
             // Update user subscription status
       const { error: userError } = await supabase
         .from('users')
         .update({ 
           subscription_tier: plan, // Use actual plan from Stripe
           subscription_status: 'active'
         })
         .eq('id', user.id);

      if (userError) throw userError;

             // Create subscription record if it doesn't exist
       const { error: subError } = await supabase
         .from('subscriptions')
         .upsert({
           user_id: user.id,
           stripe_subscription_id: sessionId,
           plan_type: plan, // Use actual plan from Stripe
           status: 'active',
           current_period_start: new Date().toISOString(),
           current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
         });

      if (subError) throw subError;

      // Create bot configurations for selected bots
      for (const botId of selectedBots) {
        if (botId === 'scout') {
          await supabase
            .from('scout_configurations')
            .upsert({
              user_id: user.id,
              business_name: user.user_metadata?.company || 'Company',
              business_email: user.email || '',
              business_phone: '',
              scraping_frequency: 'daily',
              outreach_strategy: 'moderate',
              target_addresses: ['', '', ''],
              industries: ['Internet / Fiber', 'Roofing', 'Solar', 'HVAC'],
              initial_message: 'Hi [Company], I noticed your business in [Industry] and wanted to connect about [Service]. Would you be interested in a quick call to discuss how we can help grow your business?',
              follow_up_message: 'Hi [Name], I wanted to follow up on my previous message. Are you still interested in exploring [Service] opportunities for [Company]?',
              outreach_keywords: 'growth, expansion, efficiency, ROI',
              budget: '$10k-50k',
              target_size: ['10-50', '51-200'],
              is_active: true,
            });
        }
        
        if (botId === 'eve') {
          await supabase
            .from('eve_configurations')
            .upsert({
              user_id: user.id,
              business_name: user.user_metadata?.company || 'Company',
              business_email: user.email || '',
              business_phone: '',
              voice_tone: 'professional',
              operating_hours: '24-7',
              response_time_priority: 'immediate',
              calendar_integrations: [],
              languages: ['English'],
              is_active: true,
            });
        }
      }

      setIsComplete(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Error setting up your subscription. Please contact support.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isSuccess || !sessionId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {!isComplete ? (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Payment Successful! 🎉
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Welcome to Aethon! Your subscription is now active. 
                Choose which AI agents you'd like to deploy for your business.
              </p>
            </div>

                         {/* Bot Selection */}
             <Card className="bg-slate-900/60 border-green-500/30 mb-8 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
               <CardHeader>
                 <CardTitle className="text-white text-2xl text-center font-bold">
                   Select Your AI Agents
                 </CardTitle>
                 <CardDescription className="text-slate-300 text-center text-lg">
                   Choose up to {maxBots} AI agent{maxBots > 1 ? 's' : ''} for your {plan} plan
                 </CardDescription>
               </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {bots.map((bot) => (
                    <div
                      key={bot.id}
                                             onClick={() => selectedBots.length < maxBots || selectedBots.includes(bot.id) ? handleBotSelection(bot.id) : null}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedBots.includes(bot.id)
                          ? 'border-green-500 bg-green-500/10'
                          : selectedBots.length >= maxBots && !selectedBots.includes(bot.id)
                          ? 'border-slate-600 bg-slate-800/30 cursor-not-allowed opacity-50'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                                             <div className="text-center">
                         <div className="w-16 h-16 mx-auto mb-3 relative">
                           <div className={`absolute inset-0 bg-gradient-to-br from-${bot.color}-400 to-${bot.color === 'emerald' ? 'teal' : bot.color === 'pink' ? 'purple' : 'indigo'}-400 rounded-full blur-lg opacity-30`} />
                           <div className={`relative w-full h-full bg-gradient-to-br from-${bot.color}-500/20 to-${bot.color === 'emerald' ? 'teal' : bot.color === 'pink' ? 'purple' : 'indigo'}-500/20 border-2 border-${bot.color}-400/50 rounded-full flex items-center justify-center overflow-hidden`}>
                             <Player
                               src={bot.lottie}
                               autoplay
                               loop
                               style={{ width: '100%', height: '100%' }}
                               renderer="svg"
                             />
                           </div>
                         </div>
                         <h3 className="text-lg font-semibold text-white mb-2">
                           {bot.name}
                         </h3>
                        <p className="text-sm text-slate-400 mb-4">
                          {bot.description}
                        </p>
                        <div className="space-y-2">
                          {bot.features.map((feature, index) => (
                            <div key={index} className="text-xs text-slate-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        {selectedBots.includes(bot.id) && (
                          <div className="mt-4">
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              Selected
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <div className="text-center">
              <Button
                onClick={handleCompleteSetup}
                disabled={selectedBots.length === 0 || isUpdating}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Setting Up Your AI Agents...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              {selectedBots.length === 0 && (
                <p className="text-slate-400 mt-3">
                  Please select at least one AI agent to continue
                </p>
              )}
            </div>
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Setup Complete! 🚀
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              Your AI agents are being configured. Redirecting to dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          </m.div>
        )}
      </div>
    </div>
  );
}
