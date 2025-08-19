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
  Wifi, Hammer, Sun, Wrench, Database, Cpu, Crown, LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useScoutConfig } from "@/hooks/useScoutConfig";
import { useEveConfig } from "@/hooks/useEveConfig";
import { useSubscription } from "@/hooks/useSubscription";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAgent, setSelectedAgent] = useState("scout");
  
  // Real user data hooks
  const { profile: userProfile, loading: profileLoading } = useUserProfile(user);
  const { config: scoutConfig, loading: scoutLoading, saveConfig: saveScoutConfig } = useScoutConfig(user);
  const { config: eveConfig, loading: eveLoading, saveConfig: saveEveConfig } = useEveConfig(user);
  const { 
    subscription, 
    loading: subLoading, 
    getAgentAccess, 
    canAccessAgent, 
    getAvailableAgents,
    getSubscriptionStatus,
    isAdmin 
  } = useSubscription();

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
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/30 border border-slate-700/30 mb-6 backdrop-blur-sm">
              <TabsTrigger 
                value="overview" 
                className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="agents" 
                className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
              >
                AI Agents
              </TabsTrigger>
              <TabsContent value="analytics" className="space-y-6">
                Analytics
              </TabsContent>
              <TabsContent value="leads" className="space-y-6">
                Opportunities
              </TabsContent>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="border-orange-500/20 bg-slate-900/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">AI Agent Status</CardTitle>
                  <CardDescription className="text-slate-400">
                    {subscription ? `Your ${subscription.plan_type} plan agents` : 'Subscribe to access AI agents'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold text-white mb-2">Dashboard Working!</h3>
                    <p className="text-slate-400 mb-6">
                      The dashboard has been restored and is now working properly.
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Agents Tab */}
            <TabsContent value="agents" className="space-y-6">
              {/* Agent Selection */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your AI Agents</h2>
                  <p className="text-slate-400">Manage and configure your specialized AI team</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedAgent === "scout" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAgent("scout")}
                    className={selectedAgent === "scout" ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-slate-800/50'}
                  >
                    Scout
                  </Button>
                  <Button
                    variant={selectedAgent === "eve" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAgent("eve")}
                    className={selectedAgent === "eve" ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-slate-800/50'}
                  >
                    Eve
                  </Button>
                  <Button
                    variant={selectedAgent === "shadow" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAgent("shadow")}
                    className={selectedAgent === "shadow" ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-slate-800/50'}
                  >
                    Shadow
                  </Button>
                </div>
              </div>

              {/* Selected Agent Configuration */}
              {selectedAgent && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                     {/* Agent Profile Card */}
                   <Card className="border-orange-500/30 bg-slate-900/60">
                     <CardHeader>
                       <div className="flex items-center gap-4">
                         <div className="text-4xl">
                           {selectedAgent === 'scout' ? '🔍' : selectedAgent === 'eve' ? '💬' : '⚡'}
                         </div>
                         <div>
                           <CardTitle className="text-white text-2xl">
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
                         <div className="w-32 h-32 flex items-center justify-center text-6xl">
                           {selectedAgent === 'scout' && '🔍'}
                           {selectedAgent === 'eve' && '💬'}
                           {selectedAgent === 'shadow' && '⚡'}
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
                  <Card className="border-orange-500/30 bg-slate-900/60">
                    <CardHeader>
                      <CardTitle className="text-white">Configuration</CardTitle>
                      <CardDescription className="text-slate-400">
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
                                   {/* Business Information */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                       <label className="block text-sm font-medium text-slate-200 mb-2">Business Name</label>
                                       <Input
                                         placeholder="Your Business Name"
                                         value={scoutConfig.business_name || ''}
                                         onChange={(e) => saveScoutConfig({ business_name: e.target.value })}
                                         className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                       />
                                     </div>
                                     <div>
                                       <label className="block text-sm font-medium text-slate-200 mb-2">Business Email</label>
                                       <Input
                                         type="email"
                                         placeholder="business@example.com"
                                         value={scoutConfig.business_email || ''}
                                         onChange={(e) => saveScoutConfig({ business_email: e.target.value })}
                                         className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                       />
                                     </div>
                                   </div>
                                   
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Business Phone</label>
                                     <Input
                                       type="tel"
                                       placeholder="(555) 123-4567"
                                       value={scoutConfig.business_phone || ''}
                                       onChange={(e) => saveScoutConfig({ business_phone: e.target.value })}
                                       className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     />
                                   </div>

                                   {/* Lead Scraping Frequency */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Lead Scraping Frequency</label>
                                     <select 
                                       value={scoutConfig.scraping_frequency || 'daily'}
                                       onChange={(e) => saveScoutConfig({ scraping_frequency: e.target.value as any })}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-md px-3 py-2 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     >
                                       <option value="hourly">Hourly (High Volume)</option>
                                       <option value="daily">Daily (Recommended)</option>
                                       <option value="weekly">Weekly (Conservative)</option>
                                       <option value="monthly">Monthly (Low Volume)</option>
                                     </select>
                                   </div>

                                   {/* Outreach Strategy */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Outreach Strategy</label>
                                     <select 
                                       value={scoutConfig.outreach_strategy || 'moderate'}
                                       onChange={(e) => saveScoutConfig({ outreach_strategy: e.target.value as any })}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-md px-3 py-2 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     >
                                       <option value="aggressive">Aggressive (High Volume)</option>
                                       <option value="moderate">Moderate (Balanced)</option>
                                       <option value="conservative">Conservative (High Quality)</option>
                                     </select>
                                   </div>

                                   {/* Target Addresses */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Target Locations</label>
                                     <div className="space-y-2">
                                       {scoutConfig.target_addresses?.map((address, index) => (
                                         <Input
                                           key={index}
                                           placeholder={`Target location ${index + 1}`}
                                           value={address}
                                           onChange={(e) => {
                                             const newAddresses = [...(scoutConfig.target_addresses || [])]
                                             newAddresses[index] = e.target.value
                                             saveScoutConfig({ target_addresses: newAddresses })
                                           }}
                                           className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                         />
                                       ))}
                                     </div>
                                   </div>

                                   {/* Custom Messages */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Initial Contact Message</label>
                                     <textarea
                                       placeholder="Hi [Company], I noticed your business in [Industry] and wanted to connect..."
                                       value={scoutConfig.initial_message || ''}
                                       onChange={(e) => saveScoutConfig({ initial_message: e.target.value })}
                                       rows={3}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20 rounded-md px-3 py-2 resize-none"
                                     />
                                   </div>

                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Follow-up Message</label>
                                     <textarea
                                       placeholder="Hi [Name], I wanted to follow up on my previous message..."
                                       value={scoutConfig.follow_up_message || ''}
                                       onChange={(e) => saveScoutConfig({ follow_up_message: e.target.value })}
                                       rows={3}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20 rounded-md px-3 py-2 resize-none"
                                     />
                                   </div>

                                   {/* Outreach Keywords */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Outreach Keywords</label>
                                     <Input
                                       placeholder="growth, expansion, efficiency, ROI"
                                       value={scoutConfig.outreach_keywords || ''}
                                       onChange={(e) => saveScoutConfig({ outreach_keywords: e.target.value })}
                                       className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     />
                                   </div>

                                   {/* Save Button */}
                                   <div className="pt-4">
                                     <Button 
                                       onClick={() => saveScoutConfig(scoutConfig)}
                                       className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3"
                                       disabled={scoutLoading}
                                     >
                                       {scoutLoading ? 'Saving...' : 'Save Scout Configuration'}
                                     </Button>
                                   </div>
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
                                   {/* Business Information */}
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                       <label className="block text-sm font-medium text-slate-200 mb-2">Business Name</label>
                                       <Input
                                         placeholder="Your Business Name"
                                         value={eveConfig.business_name || ''}
                                         onChange={(e) => saveEveConfig({ business_name: e.target.value })}
                                         className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                       />
                                     </div>
                                     <div>
                                       <label className="block text-sm font-medium text-slate-200 mb-2">Business Email</label>
                                       <Input
                                         type="email"
                                         placeholder="business@example.com"
                                         value={eveConfig.business_email || ''}
                                         onChange={(e) => saveEveConfig({ business_email: e.target.value })}
                                         className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                       />
                                     </div>
                                   </div>
                                   
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Business Phone</label>
                                     <Input
                                       type="tel"
                                       placeholder="(555) 123-4567"
                                       value={eveConfig.business_phone || ''}
                                       onChange={(e) => saveEveConfig({ business_phone: e.target.value })}
                                       className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     />
                                   </div>

                                   {/* Voice and Tone */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Voice & Tone</label>
                                     <select 
                                       value={eveConfig.voice_tone || 'professional'}
                                       onChange={(e) => saveEveConfig({ voice_tone: e.target.value as any })}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-md px-3 py-2 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     >
                                       <option value="professional">Professional & Formal</option>
                                       <option value="friendly">Friendly & Approachable</option>
                                       <option value="casual">Casual & Conversational</option>
                                       <option value="enthusiastic">Enthusiastic & Energetic</option>
                                       <option value="empathetic">Empathetic & Caring</option>
                                     </select>
                                   </div>

                                   {/* Operating Hours */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Operating Hours</label>
                                     <select 
                                       value={eveConfig.operating_hours || '24-7'}
                                       onChange={(e) => saveEveConfig({ operating_hours: e.target.value as any })}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-md px-3 py-2 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     >
                                       <option value="24-7">24/7 (Always Available)</option>
                                       <option value="business-hours">Business Hours Only</option>
                                       <option value="extended-hours">Extended Hours (6 AM - 10 PM)</option>
                                       <option value="custom">Custom Schedule</option>
                                     </select>
                                   </div>

                                   {/* Response Time Priority */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Response Time Priority</label>
                                     <select 
                                       value={eveConfig.response_time_priority || 'immediate'}
                                       onChange={(e) => saveEveConfig({ response_time_priority: e.target.value as any })}
                                       className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-md px-3 py-2 focus:border-orange-500/50 focus:ring-orange-500/20"
                                     >
                                       <option value="immediate">Immediate (Under 30 seconds)</option>
                                       <option value="fast">Fast (Under 2 minutes)</option>
                                       <option value="standard">Standard (Under 5 minutes)</option>
                                       <option value="relaxed">Relaxed (Under 15 minutes)</option>
                                     </select>
                                   </div>

                                   {/* Language Support */}
                                   <div>
                                     <label className="block text-sm font-medium text-slate-200 mb-2">Language Support</label>
                                     <div className="space-y-2">
                                       {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'].map((language) => (
                                         <label key={language} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer">
                                           <input
                                             type="checkbox"
                                             checked={eveConfig.languages?.includes(language) || false}
                                             onChange={(e) => {
                                               const newLanguages = e.target.checked 
                                                 ? [...(eveConfig.languages || []), language]
                                                 : (eveConfig.languages || []).filter(l => l !== language)
                                               saveEveConfig({ languages: newLanguages })
                                             }}
                                             className="rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500/20 focus:ring-offset-slate-900"
                                           />
                                           <span className="text-sm text-slate-200">{language}</span>
                                         </label>
                                       ))}
                                     </div>
                                   </div>

                                   {/* Save Button */}
                                   <div className="pt-4">
                                     <Button 
                                       onClick={() => saveEveConfig(eveConfig)}
                                       className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3"
                                       disabled={eveLoading}
                                     >
                                       {eveLoading ? 'Saving...' : 'Save Eve Configuration'}
                                     </Button>
                                   </div>
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}
