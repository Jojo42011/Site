"use client";
import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { 
  Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles, 
  Activity, TrendingUp, Users, Target, Globe,
  Building2, DollarSign, Clock, CheckCircle2, AlertCircle, 
  Play, Pause, RotateCcw, BarChart3, Zap, Shield,
  Wifi, Hammer, Sun, Wrench, Database, Cpu, Crown, LogOut,
  MessageCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useScoutConfig } from "@/hooks/useScoutConfig";
import { useEveConfig } from "@/hooks/useEveConfig";
import { EveOnboarding } from "@/components/EveOnboarding";
import { ScoutOnboarding } from "@/components/ScoutOnboarding";
import { useSubscription } from "@/hooks/useSubscription";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => ({ default: mod.Player })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-700/30 rounded-full animate-pulse" />
});

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  
  // Real user data hooks
  const { profile: userProfile, loading: profileLoading } = useUserProfile(user);
  const { 
    config: scoutConfig, 
    loading: scoutLoading, 
    saveConfig: saveScoutConfig,
    currentStep: scoutCurrentStep,
    currentStepIndex: scoutCurrentStepIndex,
    totalSteps: scoutTotalSteps,
    progress: scoutProgress,
    onboardingComplete: scoutOnboardingComplete,
    onNext: scoutOnNext,
    onPrevious: scoutOnPrevious,
    onSave: scoutOnSave,
    onComplete: scoutOnComplete,
    onBack: scoutOnBack
  } = useScoutConfig(user);
  const { 
    config: eveConfig, 
    loading: eveLoading, 
    saveConfig: saveEveConfig,
    onboardingMode,
    onboardingComplete,
    currentStepIndex,
    startOnboarding,
    nextStep,
    previousStep,
    getCurrentStep,
    getProgress,
    onboardingSteps
  } = useEveConfig(user);
  const { 
    subscription, 
    loading: subLoading, 
    getAgentAccess, 
    canAccessAgent, 
    getAvailableAgents,
    getSubscriptionStatus,
    isAdmin 
  } = useSubscription();

    // Check what bots were actually selected during setup and pre-select the first available one
  useEffect(() => {
    if (subscription && !selectedAgent) {
      console.log('=== AGENT SELECTION DEBUG ===');
      console.log('User Profile:', userProfile);
      console.log('User Profile selected_bots:', userProfile?.selected_bots);
      console.log('Scout Config:', scoutConfig);
      console.log('Eve Config:', eveConfig);
      console.log('Subscription:', subscription);
      console.log('Current selectedAgent:', selectedAgent);
      
      // Use the user's stored bot selection preference from setup
      if (userProfile?.selected_bots && userProfile.selected_bots.length > 0) {
        // Use the first agent the user selected during setup
        const firstSelectedBot = userProfile.selected_bots[0];
        console.log('🎯 Using user\'s stored bot preference:', firstSelectedBot, 'from:', userProfile.selected_bots);
        
        // Validate that the selected agent is valid
        if (['scout', 'eve', 'shadow'].includes(firstSelectedBot)) {
          console.log('✅ Valid agent selected, setting to:', firstSelectedBot);
          setSelectedAgent(firstSelectedBot);
        } else {
          console.warn('❌ Invalid agent in user preference:', firstSelectedBot);
          // Fallback to first available agent based on plan
          const fallbackAgent = subscription.plan_type === 'enterprise' ? 'scout' : 'eve';
          console.log('🔄 Using fallback agent:', fallbackAgent);
          setSelectedAgent(fallbackAgent);
        }
      } else {
        console.log('⚠️ No selected_bots found in user profile, using plan-based default');
        // Simple fallback based on plan type
        const defaultAgent = subscription.plan_type === 'enterprise' ? 'scout' : 'eve';
        console.log('🔄 Using plan-based default:', defaultAgent);
        setSelectedAgent(defaultAgent);
      }
      console.log('=== END AGENT SELECTION DEBUG ===');
    }
  }, [subscription, selectedAgent, userProfile]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-orange-500/20 to-slate-950" />
        
        {/* Header */}
        <header className="relative z-10 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center gap-4">
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-lg"></div>
                    <svg width="40" height="40" viewBox="0 0 24 24" className="relative">
                      <defs>
                        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#ff512f" />
                          <stop offset="100%" stopColor="#f09819" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12z"
                        fill="url(#logoGrad)"
                      />
                      <path
                        d="M6 8c2 2 4 2 6 2s4 0 6-2M6 16c2-2 4-2 6-2s4 0 6 2"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        opacity="0.9"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-extrabold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 animate-shine drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
                      Aethon
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/40 text-xs px-2 py-1">
                        AI Automation Platform
                      </Badge>
                      <div className="h-1 w-1 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">Live</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* User Section */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {profileLoading ? 'Loading...' : userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'User'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {profileLoading ? 'Loading...' : userProfile?.company || 'Company'}
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-sm font-bold hover:scale-110 transition-transform duration-200 cursor-pointer">
                    {profileLoading ? 'U' : userProfile ? userProfile.first_name.charAt(0) : 'U'}
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link href="/pricing">
                    <Button variant="outline" size="sm" className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/70 bg-slate-800/30">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
          {/* Welcome Section */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="text-center">
              {profileLoading ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-12 bg-slate-800 rounded-lg w-96 mx-auto mb-4"></div>
                    <div className="h-6 bg-slate-800 rounded-lg w-80 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                      {userProfile ? userProfile.first_name : 'User'}
                    </span>!
                  </h1>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
                    Your AI agents are working <span className="text-orange-300 font-semibold">24/7</span> to automate your business operations.
                  </p>
                </>
              )}
            </div>
          </m.div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                         <TabsList className="w-full bg-slate-900/80 border-2 border-orange-500/50 mb-6 rounded-xl p-1 shadow-2xl shadow-orange-500/20">
               <TabsTrigger 
                 value="overview" 
                 className="flex-1 text-slate-300 font-bold text-lg py-4 px-6 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-orange-500/50 data-[state=active]:scale-105 hover:bg-slate-800/80 hover:text-white"
               >
                 Overview
               </TabsTrigger>
               <TabsTrigger 
                 value="agents" 
                 className="flex-1 text-slate-300 font-bold text-lg py-4 px-6 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-orange-500/50 data-[state=active]:scale-105 hover:bg-slate-800/80 hover:text-white"
               >
                 AI Agents
               </TabsTrigger>
             </TabsList>

                         {/* Overview Tab */}
             <TabsContent value="overview" className="space-y-6">
                               <Card className="border-orange-500/20 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl font-bold">AI Agent Status</CardTitle>
                    <CardDescription className="text-slate-300 text-lg">
                      {subscription ? `Your ${subscription.plan_type} plan agents` : 'Subscribe to access AI agents'}
                    </CardDescription>
                  </CardHeader>
                 <CardContent>
                   <div className="text-center py-8">
                     {subscription ? (
                       <>
                         <div className="text-6xl mb-4">🎉</div>
                         <h3 className="text-xl font-bold text-white mb-2">Subscription Active!</h3>
                         <p className="text-slate-400 mb-4">
                           You have access to {subscription.plan_type === 'enterprise' ? 'all 3' : subscription.plan_type === 'professional' ? '2' : '1'} AI agent(s)
                         </p>
                         <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4">
                           {subscription.status.toUpperCase()}
                         </Badge>
                         <div className="text-sm text-slate-400">
                           Plan: {subscription.plan_type.charAt(0).toUpperCase() + subscription.plan_type.slice(1)}
                         </div>
                       </>
                     ) : (
                       <>
                         <div className="text-6xl mb-4">🔒</div>
                         <h3 className="text-xl font-bold text-white mb-2">No Active Subscription</h3>
                         <p className="text-slate-400 mb-6">
                           Subscribe to unlock AI agent access and automation features
                         </p>
                         <Link href="/pricing">
                           <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                             View Pricing Plans
                           </Button>
                         </Link>
                       </>
                     )}
                   </div>
                 </CardContent>
               </Card>
               
               {/* Agent Status Cards */}
               {subscription && (
                 <div className="grid md:grid-cols-3 gap-6">
                   {subscription.plan_type === 'enterprise' || subscription.plan_type === 'professional' ? (
                     <Card className="border-emerald-500/30 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                       <CardHeader className="text-center">
                         <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                           <span className="text-3xl">🔍</span>
                         </div>
                         <CardTitle className="text-white text-lg font-bold">Scout</CardTitle>
                         <CardDescription className="text-emerald-300 font-medium">Lead Intelligence</CardDescription>
                       </CardHeader>
                       <CardContent className="text-center">
                         <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm font-medium">
                           Active
                         </Badge>
                       </CardContent>
                     </Card>
                   ) : null}
                   
                   {subscription.plan_type === 'enterprise' || subscription.plan_type === 'professional' ? (
                     <Card className="border-pink-500/30 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                       <CardHeader className="text-center">
                         <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-500/30">
                           <span className="text-3xl">💬</span>
                         </div>
                         <CardTitle className="text-white text-lg font-bold">Eve</CardTitle>
                         <CardDescription className="text-pink-300 font-medium">Customer Service</CardDescription>
                       </CardHeader>
                       <CardContent className="text-center">
                         <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm font-medium">
                           Active
                         </Badge>
                       </CardContent>
                     </Card>
                   ) : null}
                   
                   {subscription.plan_type === 'enterprise' && (
                     <Card className="border-purple-500/30 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                       <CardHeader className="text-center">
                         <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                           <span className="text-3xl">⚡</span>
                         </div>
                         <CardTitle className="text-white text-lg font-bold">Shadow</CardTitle>
                         <CardDescription className="text-purple-300 font-medium">Workflow Automation</CardDescription>
                       </CardHeader>
                       <CardContent className="text-center">
                         <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm font-medium">
                           Active
                         </Badge>
                       </CardContent>
                     </Card>
                   )}
                 </div>
               )}
             </TabsContent>

                         {/* AI Agents Tab */}
             <TabsContent value="agents" className="space-y-6">
                               {/* Agent Selection */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your AI Agents</h2>
                    <p className="text-slate-300 text-lg">Manage and configure your specialized AI team</p>
                  </div>
                 {subscription && (
                   <div className="flex gap-2">
                     {/* Dynamically show only the bots the user actually selected during setup */}
                     {userProfile?.selected_bots?.map((botId) => (
                       <Button
                         key={botId}
                         variant={selectedAgent === botId ? "default" : "outline"}
                         size="sm"
                         onClick={() => setSelectedAgent(botId)}
                         className={selectedAgent === botId ? 
                           (botId === 'scout' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                            botId === 'eve' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 
                            'bg-purple-500 hover:bg-purple-600 text-white') : 
                           'border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-slate-800/50'
                         }
                       >
                         {botId === 'scout' ? 'Scout' : 
                          botId === 'eve' ? 'Eve' : 
                          botId === 'shadow' ? 'Shadow' : botId}
                       </Button>
                     ))}
                   </div>
                 )}
               </div>

                             {/* Selected Agent Configuration */}
               {selectedAgent ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                     {/* Agent Profile Card */}
                                       <Card className="border-orange-500/30 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">
                            {selectedAgent === 'scout' ? '🔍' : selectedAgent === 'eve' ? '💬' : '⚡'}
                          </div>
                          <div>
                            <CardTitle className="text-white text-2xl font-bold">
                              {selectedAgent === 'scout' ? 'Scout' : selectedAgent === 'eve' ? 'Eve' : 'Shadow'}
                            </CardTitle>
                            <CardDescription className="text-slate-300 text-lg">
                              {selectedAgent === 'scout' ? 'Lead Intelligence Specialist' : 
                               selectedAgent === 'eve' ? 'Customer Service Specialist' : 
                               'Workflow Automation Specialist'}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                     <CardContent className="space-y-6">
                       {/* Agent Icon */}
                       <div className="flex justify-center">
                         <div className="w-32 h-32 flex items-center justify-center relative">
                           {selectedAgent === 'scout' && (
                             <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/50 rounded-full flex items-center justify-center overflow-hidden">
                               <Player
                                 src="/assets/scout.json"
                                 autoplay
                                 loop
                                 style={{ width: '100%', height: '100%' }}
                                 renderer="svg"
                               />
                             </div>
                           )}
                           {selectedAgent === 'eve' && (
                             <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/50 rounded-full flex items-center justify-center overflow-hidden">
                               <Player
                                 src="/assets/Nova.json"
                                 autoplay
                                 loop
                                 style={{ width: '100%', height: '100%' }}
                                 renderer="svg"
                               />
                             </div>
                           )}
                           {selectedAgent === 'shadow' && (
                             <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-orange-500/20 border-2 border-purple-400/50 rounded-full flex items-center justify-center overflow-hidden">
                               <Player
                                 src="/assets/shadow.json"
                                 autoplay
                                 loop
                                 style={{ width: '100%', height: '100%' }}
                                 renderer="svg"
                               />
                             </div>
                           )}
                         </div>
                       </div>

                       {/* Agent Description */}
                       <div className="space-y-4">
                         <div>
                           <h4 className="text-lg font-semibold text-white mb-2">
                             About {selectedAgent === 'scout' ? 'Scout' : selectedAgent === 'eve' ? 'Eve' : 'Shadow'}
                           </h4>
                           <p className="text-slate-300 leading-relaxed">
                             {selectedAgent === 'scout' && 
                               "Scout is your always-on AI agent, relentlessly scanning billions of data signals to spot high-value opportunities before anyone else."
                             }
                             {selectedAgent === 'eve' && 
                               "Eve is your all-in-one AI support agent, seamlessly integrating into any business to handle customer inquiries, resolve issues, and maintain high satisfaction."
                             }
                             {selectedAgent === 'shadow' && 
                               "Shadow is your business's command center for decision-making and process automation."
                             }
                           </p>
                         </div>

                         {/* Agent Capabilities */}
                         <div>
                           <h4 className="text-lg font-semibold text-white mb-3">Capabilities</h4>
                           <div className="space-y-2">
                             {selectedAgent === 'scout' && (
                               <>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                                   <span className="text-sm">Real-time lead generation & qualification</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                                   <span className="text-sm">Market intelligence & trend analysis</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                                   <span className="text-sm">Automated outreach & follow-up</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                                   <span className="text-sm">Competitor monitoring & analysis</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                                   <span className="text-sm">Lead scoring & prioritization</span>
                                 </div>
                               </>
                             )}
                             {selectedAgent === 'eve' && (
                               <>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                                   <span className="text-sm">24/7 customer support & inquiry handling</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                                   <span className="text-sm">Multi-language customer service</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                                   <span className="text-sm">Issue resolution & escalation</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                                   <span className="text-sm">Customer satisfaction monitoring</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                                   <span className="text-sm">Knowledge base management</span>
                                 </div>
                               </>
                             )}
                             {selectedAgent === 'shadow' && (
                               <>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                   <span className="text-sm">Workflow automation & orchestration</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                   <span className="text-sm">API integration & data synchronization</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                   <span className="text-sm">Decision-making & business logic</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-300">
                                   <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                                   <span className="text-sm">Process optimization & monitoring</span>
                                 </div>
                                 <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                                   <span>Coming Soon - Currently in Development</span>
                                 </div>
                               </>
                             )}
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>

                  {/* Agent Configuration */}
                                     <Card className="border-orange-500/30 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                     <CardHeader>
                       <CardTitle className="text-white text-xl font-bold">Configuration</CardTitle>
                       <CardDescription className="text-slate-300">
                         Customize {selectedAgent === 'scout' ? 'Scout' : selectedAgent === 'eve' ? 'Eve' : 'Shadow'}'s behavior and targeting
                       </CardDescription>
                     </CardHeader>
                                         <CardContent className="space-y-6">
                       {/* Scout Configuration */}
                       {selectedAgent === 'scout' && (
                         <div className="space-y-4">
                           {/* Subscription Check */}
                           {!subscription ? (
                             <div className="text-center py-8">
                               <div className="text-4xl mb-4">🔒</div>
                               <h3 className="text-xl font-bold text-white mb-2">Subscription Required</h3>
                               <p className="text-slate-300 mb-6">
                                 Subscribe to access Scout's lead intelligence configuration and start generating leads automatically.
                               </p>
                               <Link href="/pricing">
                                 <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6">
                                   View Pricing Plans
                                 </Button>
                               </Link>
                             </div>
                           ) : (
                             <>
                               {scoutLoading ? (
                                 <div className="text-center py-8">
                                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                                   <p className="text-slate-400">Loading Scout configuration...</p>
                                 </div>
                               ) : scoutConfig ? (
                                 <>
                                   {/* Show onboarding if not complete, otherwise show configuration summary */}
                                   {!scoutOnboardingComplete ? (
                                     <ScoutOnboarding
                                       config={scoutConfig}
                                       onSave={(field, value) => scoutOnSave(field, value)}
                                       onComplete={() => scoutOnComplete()}
                                       onBack={() => setActiveTab('overview')}
                                       currentStep={scoutCurrentStep}
                                       currentStepIndex={scoutCurrentStepIndex}
                                       totalSteps={scoutTotalSteps}
                                       onNext={() => scoutOnNext()}
                                       onPrevious={() => scoutOnPrevious()}
                                       progress={scoutProgress}
                                     />
                                   ) : (
                                     <div className="space-y-6">
                                       {/* Configuration Summary */}
                                       <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50">
                                         <h3 className="text-lg font-semibold text-white mb-4">Configuration Complete! 🎯</h3>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                           <div>
                                             <span className="text-slate-400">Business:</span> {scoutConfig.business_name}
                                           </div>
                                           <div>
                                             <span className="text-slate-400">Strategy:</span> {scoutConfig.outreach_strategy}
                                           </div>
                                           <div>
                                             <span className="text-slate-400">Frequency:</span> {scoutConfig.scraping_frequency}
                                           </div>
                                           <div>
                                             <span className="text-slate-400">Target Areas:</span> {scoutConfig.target_addresses?.length || 0} locations
                                           </div>
                                         </div>
                                       </div>
                                       
                                       {/* Quick Actions */}
                                       <div className="flex gap-3">
                                         <Button
                                           onClick={() => scoutOnBack()}
                                           variant="outline"
                                           className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/70"
                                         >
                                           Edit Configuration
                                         </Button>
                                         <Button
                                           className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                                         >
                                           Start Lead Generation
                                         </Button>
                                       </div>
                                     </div>
                                   )}
                                 </>
                               ) : (
                                 <div className="text-center py-8">
                                   <p className="text-slate-400">Failed to load Scout configuration</p>
                                 </div>
                               )}
                             </>
                           )}
                         </div>
                       )}

                                             {/* Eve Configuration */}
                       {selectedAgent === 'eve' && (
                         <div className="space-y-4">
                           {/* Subscription Check */}
                           {!subscription ? (
                             <div className="text-center py-8">
                               <div className="text-4xl mb-4">🔒</div>
                               <h3 className="text-xl font-bold text-white mb-2">Subscription Required</h3>
                               <p className="text-slate-300 mb-6">
                                 Subscribe to access Eve's customer service configuration and provide 24/7 support to your customers.
                               </p>
                               <Link href="/pricing">
                                 <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6">
                                   View Pricing Plans
                                 </Button>
                               </Link>
                             </div>
                           ) : (
                             <>
                               {eveLoading ? (
                                 <div className="text-center py-8">
                                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
                                   <p className="text-slate-400">Loading Eve configuration...</p>
                                 </div>
                               ) : eveConfig ? (
                                 <>
                                   {/* Conversational Onboarding */}
                                   {onboardingMode ? (
                                     <EveOnboarding
                                       config={eveConfig}
                                       onSave={(field, value) => saveEveConfig({ [field]: value })}
                                       onComplete={() => {
                                         // Save final config and exit onboarding
                                         saveEveConfig(eveConfig)
                                       }}
                                       onBack={() => {
                                         // Exit onboarding mode
                                         window.location.reload()
                                       }}
                                       currentStep={getCurrentStep()}
                                       currentStepIndex={currentStepIndex}
                                       totalSteps={onboardingSteps.length}
                                       onNext={nextStep}
                                       onPrevious={previousStep}
                                       progress={getProgress()}
                                     />
                                   ) : (
                                     <>
                                       {/* Onboarding Status */}
                                       {!onboardingComplete ? (
                                         <div className="text-center py-12">
                                           <div className="text-6xl mb-6">🤖</div>
                                           <h3 className="text-2xl font-bold text-white mb-4">Welcome to Eve Configuration!</h3>
                                           <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                                             Instead of filling out a long form, let me ask you a few questions about your business. 
                                             I'll explain why I need each piece of information and help you configure Eve for optimal customer service.
                                           </p>
                                           <Button 
                                             onClick={startOnboarding}
                                             className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-8 text-lg"
                                           >
                                             <MessageCircle className="h-6 w-6 mr-3" />
                                             Start Conversational Setup
                                           </Button>
                                           <p className="text-slate-400 text-sm mt-4">
                                             Takes about 5-10 minutes • You can skip optional questions
                                           </p>
                                         </div>
                                       ) : (
                                         <div className="text-center py-8">
                                           <div className="text-6xl mb-4">✅</div>
                                           <h3 className="text-xl font-bold text-white mb-2">Eve Configuration Complete!</h3>
                                           <p className="text-slate-300 mb-6">
                                             Your Eve AI assistant is now configured and ready to provide excellent customer service.
                                           </p>
                                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                               <div className="text-2xl mb-2">🏢</div>
                                               <div className="font-semibold text-white">{eveConfig.business_name}</div>
                                               <div className="text-slate-400 text-sm">{eveConfig.company_industry?.replace(/_/g, ' ')}</div>
                                             </div>
                                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                               <div className="text-2xl mb-2">🎭</div>
                                               <div className="font-semibold text-white">{eveConfig.voice_tone?.replace(/_/g, ' ')}</div>
                                               <div className="text-slate-400 text-sm">Voice & Tone</div>
                                             </div>
                                             <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                                               <div className="text-2xl mb-2">⏰</div>
                                               <div className="font-semibold text-white">{eveConfig.operating_hours?.replace(/_/g, ' ')}</div>
                                               <div className="text-slate-400 text-sm">Operating Hours</div>
                                             </div>
                                           </div>
                                           <Button 
                                             onClick={startOnboarding}
                                             variant="outline"
                                             className="border-pink-500/50 text-pink-300 hover:bg-pink-500/10 hover:border-pink-500/70"
                                           >
                                             <MessageCircle className="h-4 w-4 mr-2" />
                                             Reconfigure Eve
                                           </Button>
                                         </div>
                                       )}
                                     </>
                                   )}
                                   





                                 </>
                               ) : (
                                 <div className="text-center py-8">
                                   <p className="text-slate-400">Failed to load Eve configuration</p>
                                 </div>
                               )}
                             </>
                           )}
                         </div>
                       )}

                                             {/* Shadow Configuration - Coming Soon */}
                       {selectedAgent === 'shadow' && (
                         <div className="text-center py-12">
                           <div className="text-6xl mb-6">⚡</div>
                           <h3 className="text-2xl font-bold text-white mb-4">Shadow Configuration</h3>
                           <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 rounded-lg p-6 mb-6">
                             <h4 className="text-xl font-bold text-purple-300 mb-2">🚧 Coming Soon 🚧</h4>
                             <p className="text-slate-300 text-lg mb-4">Workflow automation configuration is currently in development</p>
                           </div>
                           <div className="max-w-md mx-auto p-6 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                             <p className="text-slate-400 text-sm mb-4">We're planning integrations with:</p>
                             <div className="space-y-2 text-left">
                               <div className="flex items-center gap-3 text-slate-300">
                                 <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                 <span>Google Sheets & Docs</span>
                               </div>
                               <div className="flex items-center gap-3 text-slate-300">
                                 <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                 <span>Zapier & Make.com</span>
                               </div>
                               <div className="flex items-center gap-3 text-slate-300">
                                 <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                 <span>Custom API Integrations</span>
                               </div>
                               <div className="flex items-center gap-3 text-slate-300">
                                 <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                                 <span>Workflow Orchestration</span>
                               </div>
                             </div>
                           </div>
                           <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                             <p className="text-slate-400 text-sm">
                               <span className="text-purple-400 font-semibold">Shadow</span> will be your business's command center for decision-making and process automation
                             </p>
                           </div>
                         </div>
                       )}
                     </CardContent>
                   </Card>
                 </div>
               ) : (
                 <div className="text-center py-12">
                   <div className="text-6xl mb-6">🤖</div>
                   <h3 className="text-2xl font-bold text-white mb-4">Select an AI Agent</h3>
                   <p className="text-slate-300 text-lg mb-6">
                     Choose an AI agent from the buttons above to view its configuration and capabilities.
                   </p>
                 </div>
               )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
