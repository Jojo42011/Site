"use client";
import React, { useState } from "react";
import { motion as m } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "@/components/CheckoutButton";
import { 
  Sparkles, Zap, Crown, CheckCircle2, ShieldCheck, 
  Users2, ArrowLeft, Star, Clock, Zap as ZapIcon
} from "lucide-react";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    starter: {
      name: "Starter",
      monthlyPrice: 0.10,
      yearlyPrice: 0.10,
      icon: Sparkles,
      color: "emerald",
      description: "Perfect for small businesses getting started with AI",
      features: [
        "Choose 1 AI Agent",
        "Basic Configuration Options",
        "Email Support",
        "Standard Analytics",
        "Up to 1,000 operations/month",
        "Basic Integrations"
      ],
      limitations: [
        "Limited to 1 agent",
        "Basic configuration options",
        "Standard support response time"
      ]
    },
    professional: {
      name: "Professional",
      monthlyPrice: 0.10,
      yearlyPrice: 0.10,
      icon: Zap,
      color: "orange",
      description: "Ideal for growing businesses with multiple AI needs",
      features: [
        "Choose 2 AI Agents",
        "Advanced Configuration Options",
        "Priority Support",
        "Advanced Analytics & Reporting",
        "Up to 5,000 operations/month",
        "API Access",
        "Custom Workflows",
        "Advanced Integrations"
      ],
      limitations: [
        "Limited to 2 agents",
        "No custom integrations"
      ]
    },
    enterprise: {
      name: "Enterprise",
      monthlyPrice: 0.10,
      yearlyPrice: 0.10,
      icon: Crown,
      color: "purple",
      description: "Full AI workforce for established businesses",
      features: [
        "All 3 AI Agents",
        "Unlimited Configuration Options",
        "24/7 Dedicated Support",
        "Enterprise Analytics & Custom Reports",
        "Unlimited operations/month",
        "Full API Access + Webhooks",
        "Custom Integrations",
        "Dedicated Account Manager",
        "White-label Solutions",
        "Advanced Security Features",
        "Admin Access"
      ],
      limitations: []
    }
  };

  const savings = {
    starter: 17,
    professional: 17,
    enterprise: 17
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" className="mr-2">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff512f" />
                    <stop offset="100%" stopColor="#f09819" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="url(#logoGrad)"
                />
                <path
                  d="M2 17L12 22L22 17"
                  fill="url(#logoGrad)"
                />
                <path
                  d="M2 12L12 17L22 12"
                  fill="url(#logoGrad)"
                />
              </svg>
              <span className="text-xl font-bold text-white">Aethon</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-orange-500/30 text-orange-300 hover:bg-orange-500/10">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">AI Team</span>
            </m.h1>
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto mb-8"
            >
              Start with one agent or unlock the full power of your AI workforce. 
              Scale as you grow with flexible pricing that works for every business.
            </m.p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  billingCycle === 'yearly' ? 'bg-orange-500' : 'bg-slate-600'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                Yearly
                <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                  Save {savings.starter}%
                </Badge>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {Object.entries(plans).map(([key, plan]) => {
              const IconComponent = plan.icon;
              const isPopular = key === 'professional';
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              
              return (
                <m.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: key === 'starter' ? 0.2 : key === 'professional' ? 0.3 : 0.4 }}
                  className="relative group"
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br from-${plan.color}-500/10 to-${plan.color === 'emerald' ? 'teal' : plan.color === 'orange' ? 'red' : 'pink'}-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />
                  
                  <div className={`relative bg-slate-900/80 backdrop-blur-xl border-2 ${
                    isPopular 
                      ? `border-${plan.color}-500/50 bg-slate-900/90` 
                      : `border-${plan.color}-500/30`
                  } rounded-2xl p-8 hover:border-${plan.color}-500/70 transition-all duration-300 hover:scale-105`}>
                    
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-${plan.color}-500/20 rounded-2xl mb-4`}>
                        <IconComponent className={`h-8 w-8 text-${plan.color}-400`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-slate-400">{plan.description}</p>
                    </div>
                    
                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold text-white mb-2">
                        ${price}<span className="text-lg text-slate-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-slate-400 text-sm">
                          ${plan.monthlyPrice}/month when billed annually
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle2 className={`h-5 w-5 text-${plan.color}-400 flex-shrink-0`} />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Limitations:</h4>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="text-xs text-slate-400 flex items-center gap-2">
                              <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                                    <CheckoutButton 
                  plan={key as 'starter' | 'professional' | 'enterprise'}
                  billingInterval={billingCycle}
                  className={`w-full text-white py-3 text-lg font-semibold`}
                />
                  </div>
                </m.div>
              );
            })}
          </div>

          {/* Additional Info */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-slate-400 mb-6">
              All plans include a 14-day free trial. No credit card required to start.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4 text-blue-400" />
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users2 className="h-4 w-4 text-purple-400" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <span>24/7 support available</span>
              </div>
            </div>
          </m.div>

          {/* FAQ Section */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-slate-700/50 bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-white">Can I change my plan later?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-700/50 bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-white">What happens after the free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    After 14 days, your chosen plan will automatically activate. You can cancel anytime before the trial ends to avoid charges.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-700/50 bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-white">Do you offer custom plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    For enterprise customers with specific needs, we offer custom plans with dedicated support and tailored features.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-700/50 bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-white">Is there a setup fee?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    No setup fees! All plans include instant access to your AI agents and full platform features from day one.
                  </p>
                </CardContent>
              </Card>
            </div>
          </m.div>
        </div>
      </main>
    </div>
  );
}


