"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import Link from "next/link";
import { Flame, Sparkles, ShieldCheck, Cpu, Database, Zap, Wifi, Hammer, Sun, Wrench, Users2, DollarSign, Clock, Activity, ChevronRight, Mail, Phone, Globe, Building2, CheckCircle2, Rocket, Layers, LineChart, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => ({ default: mod.Player })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-700/30 rounded-full animate-pulse" />
});

// Aethon — Lead Intelligence Portal Landing Page (single-file component)
// Tailwind + shadcn/ui + Framer Motion. Swap copy and images to fit your brand.

const industries = [
  { key: "internet", icon: <Wifi className="h-4 w-4" />, label: "Internet / Fiber" },
  { key: "roofing", icon: <Hammer className="h-4 w-4" />, label: "Roofing" },
  { key: "solar", icon: <Sun className="h-4 w-4" />, label: "Solar" },
  { key: "hvac", icon: <Wrench className="h-4 w-4" />, label: "HVAC" },
  { key: "agent", icon: <Users2 className="h-4 w-4" />, label: "Real Estate" },
];

export default function AethonLanding() {
  // For headline animation
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (pulseRef.current) {
      pulseRef.current.animate(
        [
          { filter: "drop-shadow(0 0 12px #fff)", opacity: 1 },
          { filter: "drop-shadow(0 0 24px #ffb347)", opacity: 0.85 },
          { filter: "drop-shadow(0 0 12px #fff)", opacity: 1 },
        ],
        {
          duration: 2200,
          iterations: Infinity,
        }
      );
    }
  }, []);

  // Add this simple animated chart component
  function LeadAcceptanceChart() {
    // Dummy data: steadily increasing acceptance rate
    const data = [32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 82, 85, 87, 90];
    const max = 100;
    const width = 340;
    const height = 120;
    const padding = 32;
    const points = data.map((v, i) => {
      const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((v / max) * (height - 2 * padding));
      return `${x},${y}`;
    }).join(" ");
    const [draw, setDraw] = useState(false);

    useEffect(() => {
      setTimeout(() => setDraw(true), 400);
    }, []);

    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="font-semibold text-white mb-2">Lead Acceptance Rate Over Time</div>
        <svg width={width} height={height} className="block" style={{overflow: "visible"}}>
          {/* Axes */}
          <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#fff2" strokeWidth={2}/>
          <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#fff2" strokeWidth={2}/>
          {/* Area under line */}
          <polyline
            points={draw ? points : `${padding},${height-padding}`}
            fill="none"
            stroke="url(#grad)"
            strokeWidth={4}
            style={{
              transition: "all 1.2s cubic-bezier(.4,2,.6,1)",
              strokeDasharray: 800,
              strokeDashoffset: draw ? 0 : 800,
            }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6A00" />
              <stop offset="100%" stopColor="#FF1F1F" />
            </linearGradient>
          </defs>
          {/* Dots */}
          {draw && data.map((v, i) => {
            const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
            const y = height - padding - ((v / max) * (height - 2 * padding));
            return (
              <circle key={i} cx={x} cy={y} r={3} fill="#fff" />
            );
          })}
          {/* Y axis labels */}
          <text x={padding-8} y={height-padding+4} fontSize={12} fill="#fff8">0%</text>
          <text x={padding-8} y={padding+4} fontSize={12} fill="#fff8">100%</text>
        </svg>
        <div className="mt-2 text-xs text-slate-300">System effectiveness improves as more leads are accepted.</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Flow-based logo */}
            <span className="relative flex items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" className="mr-2">
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff512f" />
                    <stop offset="100%" stopColor="#f09819" />
                  </linearGradient>
                </defs>
                {/* Flowing wave symbol */}
                <path
                  d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12z"
                  fill="url(#logoGrad)"
                />
                {/* Flowing lines inside circle */}
                <path
                  d="M6 8c2 2 4 2 6 2s4 0 6-2M6 16c2-2 4-2 6-2s4 0 6 2"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  opacity="0.8"
                  strokeLinecap="round"
                />
              </svg>
              {/* Big, bold, glowing "Aethon" */}
              <span
                className="font-extrabold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 animate-shine drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                }}
              >
                Aethon
              </span>
            </span>
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
          </nav>
          <div className="ml-3">
            <div className="flex gap-3">
              <Link href="/pricing">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 scale-100 hover:scale-105 transition-transform duration-200 shadow-lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  View Pricing
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="bg-slate-700 hover:bg-slate-600 scale-100 hover:scale-105 transition-transform duration-200 shadow-lg">
                  Log In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:text-white scale-100 hover:scale-105 transition-transform duration-200 shadow-lg">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Premium blurred abstract wave/flare overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/30 via-orange-500/40 to-slate-950" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[220px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 30%, #ffb34788 0%, #ff512f22 70%, transparent 100%)",
            filter: "blur(48px)",
            opacity: 0.7,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <m.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]">
              AI Automations That{" "}
              <span
                ref={pulseRef}
                className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-300 text-transparent bg-clip-text font-extrabold animate-shine"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                }}
              >
                Work While You Sleep.
              </span>
            </m.h1>
            <p className="mt-4 text-xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] max-w-xl">
              Free yourself from repetitive work. Our <span className="font-semibold text-orange-300">AI Agents</span> run 24/7, finding, qualifying, and engaging clients so you can focus on closing deals or simply enjoying your life.
            </p>
            <div className="mt-6 flex items-center gap-3">
             
            </div>
            <div className="mt-6 flex items-center gap-5 text-sm text-slate-400"></div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-orange-500/20 blur-3xl rounded-full"/>
            {/* Agent Slider with multiple cards */}
            <AgentSlider />
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product" className="py-20 md:py-24 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Aethon Intelligence Feature - Centered and Prominent */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                <Cpu className="h-6 w-6 text-orange-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Aethon Intelligence</h2>
            </div>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Aethon is your team of AI employees—specialists built to run entire workflows across sales, marketing, operations, and support. They process data in real time, adapt to your goals, and coordinate tasks seamlessly, so every part of your business runs faster, smarter, and without bottlenecks.
            </p>
          </div>

          {/* Meet Your Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your Team</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Three specialized AI agents, each with unique capabilities, working together to transform your business operations
            </p>
          </div>

          {/* AI Agent Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Scout Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-slate-900/80 backdrop-blur border-emerald-500/30 rounded-2xl p-8 h-full">
                <CardHeader className="text-center pb-6">
                  {/* Scout Lottie Animation */}
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Player
                        src="/assets/scout.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                        renderer="svg"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-emerald-300 mb-2">Scout</CardTitle>
                  <div className="text-sm text-emerald-200 font-medium">Lead Intelligence Specialist</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-white text-sm leading-relaxed">
                    <p className="mb-3">Scout is your always-on AI agent, relentlessly scanning billions of data signals to spot high-value opportunities before anyone else.</p>
                    <p className="mb-3">Then it acts instantly—launching targeted outreach, automating follow-ups, and qualifying prospects—so you stay ahead and win more deals.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-emerald-200 font-semibold text-sm">Core Capabilities:</h4>
                    <ul className="text-xs text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>Real-time lead data ingestion from 50+ sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>AI-powered outreach and follow-ups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>Automated texts and emails containing Leads daily.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>Predictive opportunity forecasting</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-emerald-200 font-semibold text-sm">Performance Metrics:</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-emerald-500/10 rounded-lg p-2">
                        <div className="text-emerald-300 font-bold">60s</div>
                        <div className="text-white/80 text-xs">Response Time</div>
                      </div>
                      <div className="bg-emerald-500/10 rounded-lg p-2">
                        <div className="text-emerald-300 font-bold">24/7</div>
                        <div className="text-white/80 text-xs">Operation</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Eve Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-slate-900/80 backdrop-blur border-pink-500/30 rounded-2xl p-8 h-full">
                <CardHeader className="text-center pb-6">
                  {/* Eve Lottie Animation */}
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Player
                        src="/assets/Nova.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                        renderer="svg"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-300 mb-2">Eve</CardTitle>
                  <div className="text-sm text-pink-200 font-medium">Customer Service Specialist</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-white text-sm leading-relaxed">
                    <p className="mb-3">Eve is your all-in-one AI support agent, seamlessly integrating into any business to handle customer inquiries, resolve issues, and maintain high satisfaction — even in industries with heavy turnover and constant customer flow.</p>
                    <p className="mb-3">Eve adapts to every response, ensuring no opportunity slips through the cracks while maintaining authentic relationships.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-pink-200 font-semibold text-sm">Core Capabilities:</h4>
                    <ul className="text-xs text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-pink-400 mt-0.5">•</span>
                        <span>24/7 customer inquiry handling via chat, email, and SMS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-400 mt-0.5">•</span>
                        <span>Fast resolution of common issues with personalized, friendly responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-400 mt-0.5">•</span>
                        <span>Knowledge base integration for accurate, consistent answers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-400 mt-0.5">•</span>
                        <span>Response analysis & sentiment tracking</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-pink-200 font-semibold text-sm">Performance Metrics:</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-pink-500/10 rounded-lg p-2">
                        <div className="text-pink-300 font-bold">95%</div>
                        <div className="text-slate-400">Response Rate</div>
                      </div>
                      <div className="bg-pink-500/10 rounded-lg p-2">
                        <div className="text-pink-300 font-bold">3x</div>
                        <div className="text-slate-400">Engagement</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shadow Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative bg-slate-900/80 backdrop-blur border-purple-500/30 rounded-2xl p-8 h-full">
                <CardHeader className="text-center pb-6">
                  {/* Shadow Lottie Animation */}
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-2 border-purple-400/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Player
                        src="/assets/shadow.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                        renderer="svg"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-300 mb-2">Shadow</CardTitle>
                  <div className="text-sm text-purple-200 font-medium">Data Analytics Specialist</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-white text-sm leading-relaxed">
                    <p className="mb-3">Shadow is your business’s command center for decision-making.
                    It collects, organizes, and analyzes your data — turning scattered numbers into crystal-clear insights that help you move faster, cut waste, and grow profits.</p>
                    <p className="mb-3">From tracking performance to predicting future trends, Shadow ensures you’re not guessing — you’re making every decision backed by real-time intelligence.
                    In industries where timing and accuracy can make or break success, Shadow keeps you ahead of the curve.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-purple-200 font-semibold text-sm">Core Capabilities:</h4>
                    <ul className="text-xs text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Real-time tracking of sales, leads, and engagement metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Automated data sorting & reporting from multiple sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Workflow automation & optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Predictive trend analysis to forecast opportunities and risks</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-purple-200 font-semibold text-sm">Performance Metrics:</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-purple-500/10 rounded-lg p-2">
                        <div className="text-purple-300 font-bold">99.9%</div>
                        <div className="text-slate-400">Uptime</div>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-2">
                        <div className="text-purple-300 font-bold">0</div>
                        <div className="text-slate-400">Security Breaches</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">More Agents Coming Soon</h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Our AI team is constantly growing with specialized agents for every business need
              </p>

            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Card className="border-orange-500/30 bg-slate-900/60">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-orange-400" />
                    <span className="font-bold text-white text-lg">Why Now?</span>
                    <span className="flex-1 border-b border-orange-400/30 ml-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-base text-white leading-relaxed">
                    We’re at a once-in-a-generation intersection—AI is advancing faster than entire industries can adapt. Those who embrace it now gain an unshakable lead, automating at speeds and precision competitors can’t match. Aethon puts that advantage in your hands today, responding to opportunities in under 60 seconds and multiplying your team’s output without adding headcount. Wait, and the gap will only grow—until catching up is no longer an option.
                  </div>
                </CardContent>
              </Card>
              <Card className="border-orange-500/30 bg-slate-900/60">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-5 w-5 text-orange-400" />
                    <span className="font-bold text-white text-lg">Why Aethon?</span>
                    <span className="flex-1 border-b border-orange-400/30 ml-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-base text-white leading-relaxed">
                    We’re not just a tool—we’re your always-on growth partner. Our AI handles data ingestion, lead scoring, outreach, and follow-up—while you sleep—so you wake up to new opportunities daily. Built with enterprise-grade security, custom workflows for your industry, and 24/7 monitoring, Aethon is the scalable system that grows as you grow. Stop chasing. Start leading.
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>

      

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 md:py-24 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-orange-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">How Aethon Works</h2>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Aethon is a fully hosted AI automation platform where Scout, Eve, and Shadow run on our secure infrastructure, 
              accessible through your personalized dashboard. Here's how we transform your business operations.
            </p>
          </div>

          

          {/* Implementation Process - Clean 4-step flow */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Implementation Process</h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                From initial setup to full automation in as little as 48 hours
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-orange-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">1. Discovery & Setup</h4>
                <p className="text-sm text-slate-300">
                  We analyze your business processes, data sources, and automation goals
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-8 w-8 text-emerald-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">2. Agent Training</h4>
                <p className="text-sm text-slate-300">
                  Scout, Eve, and Shadow are trained on your industry data and company policies
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">3. Integration</h4>
                <p className="text-sm text-slate-300">
                  Connect your existing tools through our secure API endpoints and webhooks
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LineChart className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">4. Launch & Monitor</h4>
                <p className="text-sm text-slate-300">
                  Go live with real-time monitoring, analytics, and continuous optimization
                </p>
              </div>
            </div>
          </div>

          

          {/* AI Agent Workflow - Clean 3-column cards */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">How Your AI Agents Work Together</h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                A seamless orchestration of intelligence, service, and analytics
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="group">
                <div className="relative bg-slate-900/80 backdrop-blur border border-emerald-500/30 rounded-2xl p-6 h-full group-hover:border-emerald-400/50 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Player
                        src="/assets/scout.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                        renderer="svg"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-emerald-300 text-center mb-4">Scout's Intelligence</h4>
                  <div className="space-y-3 text-sm text-white">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Continuously scans 50+ data sources for opportunities</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Uses AI to score and prioritize leads in real-time</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Automatically launches targeted outreach campaigns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>Learns from responses to improve targeting</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-slate-900/80 backdrop-blur border border-pink-500/30 rounded-2xl p-6 h-full group-hover:border-pink-400/50 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Player
                        src="/assets/Nova.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                        renderer="svg"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-pink-300 text-center mb-4">Eve's Engagement</h4>
                  <div className="space-y-3 text-sm text-white">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Handles customer inquiries 24/7 across all channels</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Provides personalized responses using company knowledge</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Escalates complex issues to human team members</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Maintains conversation context and history</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-slate-900/80 backdrop-blur border border-purple-500/30 rounded-2xl p-6 h-full group-hover:border-purple-400/50 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-2 border-purple-400/50 rounded-full flex items-center justify-center overflow-hidden">
                      <Player
                        src="/assets/shadow.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '100%' }}
                        renderer="svg"
                      />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-purple-300 text-center mb-4">Shadow's Analytics</h4>
                  <div className="space-y-3 text-sm text-white">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Collects and analyzes data from all business operations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Identifies optimization opportunities and trends</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Generates automated reports and insights</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>Suggests workflow improvements and automation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications - Clean stats */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Technical Specifications</h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Enterprise-grade infrastructure designed for scale, security, and reliability
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Stat label="Uptime SLA" value="99.9%" />
              <Stat label="Response Time" value="< 100ms" />
              <Stat label="Data Centers" value="3 Regions" />
              <Stat label="Security" value="SOC 2 + GDPR" />
            </div>
          </div>

          {/* Call to Action - Clean and focused */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto bg-slate-900/60 border border-orange-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join the AI automation revolution and see results in as little as 48 hours
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm text-slate-300">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>No upfront infrastructure costs</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>Custom training on your data</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>24/7 expert support included</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span>Scalable as you grow</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 scale-100 hover:scale-105 transition-transform duration-200 shadow-lg">
                  Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500/30 text-orange-300 hover:bg-orange-500/10">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[300px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 30%, #ffb34722 0%, #ff512f11 70%, transparent 100%)",
            filter: "blur(48px)",
            opacity: 0.6,
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">AI Team</span>
            </m.h2>
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto"
            >
              Start with one agent or unlock the full power of your AI workforce. 
              Scale as you grow with flexible pricing that works for every business.
            </m.p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Starter Plan */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-2xl mb-4">
                    <Sparkles className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                  <p className="text-slate-400">Perfect for small businesses getting started with AI</p>
                </div>
                
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-white mb-2">
                    $99<span className="text-lg text-slate-400">/month</span>
                  </div>
                  <p className="text-slate-400">or $990/year (save 17%)</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Choose 1 AI Agent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Basic Configuration Options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Email Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Standard Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Up to 1,000 operations/month</span>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.href = '/pricing'}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg font-semibold"
                >
                  Start Free Trial
                </Button>
              </div>
            </m.div>

            {/* Professional Plan - Featured */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-orange-500/50 rounded-2xl p-8 hover:border-orange-500/70 transition-all duration-300 hover:scale-105 transform">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-2xl mb-4">
                    <Zap className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                  <p className="text-slate-400">Ideal for growing businesses with multiple AI needs</p>
                </div>
                
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-white mb-2">
                    $199<span className="text-lg text-slate-400">/month</span>
                  </div>
                  <p className="text-slate-400">or $1,990/year (save 17%)</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">Choose 2 AI Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">Advanced Configuration Options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">Priority Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">Advanced Analytics & Reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">Up to 5,000 operations/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">API Access</span>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.href = '/pricing'}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                >
                  Start Free Trial
                </Button>
              </div>
            </m.div>

            {/* Enterprise Plan */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
                    <Crown className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <p className="text-slate-400">Full AI workforce for established businesses</p>
                </div>
                
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold text-white mb-2">
                    $0.10<span className="text-lg text-slate-400">/month</span>
                  </div>
                  <p className="text-slate-400">Test pricing - $0.10/month</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">All 3 AI Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">Unlimited Configuration Options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">24/7 Dedicated Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">Enterprise Analytics & Custom Reports</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">Unlimited operations/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">Full API Access + Webhooks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-slate-300">Custom Integrations</span>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.href = '/pricing'}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 text-lg font-semibold"
                >
                  Start Free Trial
                </Button>
              </div>
            </m.div>
          </div>

          {/* Additional Info */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                <Zap className="h-4 w-4 text-blue-400" />
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users2 className="h-4 w-4 text-purple-400" />
                <span>Dedicated account manager</span>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-slate-400 text-sm gap-3">
          <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-400"/> Aethon</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#">Terms</a>
            <a className="hover:text-white" href="#">Privacy</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


function Feature({icon, title, children}:{icon:React.ReactNode,title:string,children:React.ReactNode}){
  return (
    <div className="relative">
      {/* Gradient background box with higher brightness */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: "linear-gradient(90deg,#FF6A00,#FF1F1F)", opacity: 0.6 }}
      />
      <Card className="relative bg-transparent backdrop-blur border border-white/10 rounded-2xl p-6 md:p-7">
        <CardHeader className="flex-row items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, {
              className: "h-5 w-5 text-white/90",
              "aria-label": title
            })}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
            <div className="h-px bg-white/10 my-2" />
          </div>
        </CardHeader>
        <CardContent className="text-sm text-white leading-relaxed">{children}</CardContent>
      </Card>
    </div>
  );
}

function IndustryCard({title, bullets, icon}:{title:string, bullets:string[], icon:React.ReactNode}){
  return (
    <div className="relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,106,0,.08)] group">
      {/* Match gradient brightness to top boxes */}
      <div className="absolute -inset-[1px] rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
           style={{ background: "linear-gradient(90deg,#FF6A00,#FF1F1F)" }} />
      <Card className="relative bg-transparent backdrop-blur border border-white/10 rounded-2xl p-6 md:p-7">
        <CardHeader className="flex-row items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5 text-white/90 transition-colors duration-300 group-hover:text-[#FF6A00]", "aria-label": title })}
          </div>
          <div>
            <CardTitle
              className="text-lg font-semibold text-white"
            >
              {title}
            </CardTitle>
            <div className="h-px bg-white/10 my-2" />
            <CardDescription className="text-white leading-relaxed">Signal‑driven targeting</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-white">
            {bullets.map((b, i) => <Li key={i}>{b}</Li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function PriceCard({title, price, items, highlighted, cta}:{title:string, price:string, items:string[], highlighted?:boolean, cta:string}){
  return (
    <div className="relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,106,0,.08)] group">
      <div className="absolute -inset-[1px] rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
           style={{ background: "linear-gradient(90deg,#FF6A00,#FF1F1F)" }} />
      <Card className={"relative bg-slate-900/60 backdrop-blur border-white/10 rounded-2xl p-6 md:p-7 " + (highlighted ? "ring-2 ring-orange-500" : "")}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold bg-clip-text text-transparent"
            style={{ background: "linear-gradient(90deg,#FF6A00,#FF1F1F)" }}>
            {title} {highlighted && <Badge className="bg-orange-500/10 text-orange-300 border-orange-500/30">Popular</Badge>}
          </CardTitle>
          <div className="h-px bg-white/10 my-2" />
          <CardDescription className="text-slate-300 leading-relaxed">All prices USD</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">{price}</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {items.map((it, i) => <Li key={i}>{it}</Li>)}
          </ul>
          <Button className="mt-4 w-full shadow-lg"
            style={{ background: "linear-gradient(90deg,#FF6A00,#FF1F1F)", color: "#0A0B0F" }}>
            {cta}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({label, value}:{label:string, value:string}){
  return (
    <div className="relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,106,0,.08)] group">
      <div className="absolute -inset-[1px] rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
           style={{ background: "linear-gradient(90deg,#FF6A00,#FF1F1F)" }} />
      <div className="relative p-6 md:p-7 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Li({children, icon}:{children:React.ReactNode, icon?:React.ReactNode}){
  return (
    <li className="flex items-center space-x-2">
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </li>
  );
}

function Step({ n, title, icon, text }: { n: number; title: string; icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="mb-2">{icon}</div>
      <div className="font-semibold">{n}. {title}</div>
      <div className="text-slate-300 text-xs mt-1">{text}</div>
    </div>
  );
}

// AgentSlider: Card slider for multiple AI agents with auto-cycling
function AgentSlider() {
  const agents = [
    {
      name: "Scout",
      desc: (
        <>
          Scout is your always-on AI agent, relentlessly scanning billions of data signals to spot
          high-value opportunities before anyone else. Then it acts instantly—launching targeted outreach,
          automating follow-ups, and qualifying prospects—so you stay ahead and win more deals.
        </>
      ),
      button: "Deploy Scout Now",
      bg: "from-emerald-900/40 to-red-900/30 border-emerald-500/30",
      lottie: "/assets/scout.json",
      fallback: "/assets/scout-fallback.png",
    },
    {
      name: "Eve",
      desc: (
        <>
          Eve is your AI customer specialist, sending personalized messages and nurturing leads with a human touch. She adapts to every response, ensuring no opportunity slips through the cracks.
        </>
      ),
      button: "Activate Eve",
      bg: "from-pink-500/40 to-fuchsia-800/30 border-pink-400/30",
      lottie: "/assets/nova.json",
      fallback: "/assets/nova-fallback.png",
    },
    {
      name: "Shadow",
      desc: (
        <>
          Shadow is your business’s command center for decision-making.
          It collects, organizes, and analyzes your data — turning scattered numbers into crystal-clear insights that help you move faster, cut waste, and grow profits.
        </>
      ),
      button: "Meet Shadow",
      bg: "from-purple-700/40 to-indigo-900/30 border-purple-500/30",
      lottie: "/assets/shadow.json",
      fallback: "/assets/shadow-fallback.png",
    },
  ];
  const [idx, setIdx] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const agent = agents[idx];

  // Auto-cycling effect
  React.useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setIdx((i) => (i === agents.length - 1 ? 0 : i + 1));
    }, 4000); // Change card every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, agents.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  function prev() {
    setIdx((i) => (i === 0 ? agents.length - 1 : i - 1));
    // Reset auto-play timer
    setIsPaused(false);
  }
  function next() {
    setIdx((i) => (i === agents.length - 1 ? 0 : i + 1));
    // Reset auto-play timer
    setIsPaused(false);
  }

  function toggleAutoPlay() {
    setIsAutoPlaying(!isAutoPlaying);
    setIsPaused(false);
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className={`grid md:grid-cols-[1.1fr_0.9fr] gap-6 rounded-2xl p-6 md:p-8 bg-gradient-to-br ${agent.bg} border transition-all duration-700 ease-out w-full max-w-2xl`}
        style={{ minHeight: 320 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <span 
            key={agent.name}
            className={`inline-flex items-center gap-2 font-bold text-3xl ${idx === 0 ? 'text-emerald-300' : idx === 1 ? 'text-pink-200' : 'text-purple-200'}`}
          >
            <span className={`px-2 py-0.5 rounded-full ${idx === 0 ? 'bg-emerald-400/10' : idx === 1 ? 'bg-pink-400/10' : 'bg-purple-400/10'}`}>{agent.name}</span>
          </span>
          <div className={`text-sm font-medium mt-1 ${idx === 0 ? 'text-emerald-200' : idx === 1 ? 'text-pink-200' : 'text-purple-200'}`}>
            {idx === 0 ? 'Lead Intelligence' : idx === 1 ? 'Customer Service' : 'Workflow Automation'}
          </div>
          <p 
            key={`${agent.name}-desc`}
            className="mt-3 max-w-prose font-medium text-white !text-white !shadow-none !drop-shadow-none transition-opacity duration-300" 
            style={{ color: '#fff', textShadow: 'none', filter: 'none', WebkitFontSmoothing: 'auto', MozOsxFontSmoothing: 'auto' }}
          >
            {agent.desc}
          </p>
          <div className="flex gap-3 mt-5">
            <button className={`px-5 py-3 rounded-xl font-semibold ${idx === 0 ? 'bg-gradient-to-r from-amber-500 to-lime-500' : idx === 1 ? 'bg-gradient-to-r from-pink-400 to-yellow-300' : 'bg-gradient-to-r from-purple-400 to-indigo-400'}`}
              >
              {agent.button}
            </button>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className={`absolute inset-0 blur-3xl rounded-3xl ${idx === 0 ? 'bg-emerald-400/10' : idx === 1 ? 'bg-pink-400/10' : 'bg-purple-400/10'}`} />
          {agent.lottie ? (
            <Player
              src={agent.lottie}
              autoplay
              loop
              style={{ width: '100%', maxWidth: 360, minWidth: 180, height: 'auto' }}
              renderer="svg"
            />
          ) : (
            <img
              src={agent.fallback}
              alt={agent.name + ' Mascot'}
              className="relative pointer-events-none select-none"
              style={{ width: '100%', maxWidth: 220, minWidth: 120 }}
            />
          )}
        </div>
      </div>
      
      {/* Progress dots only */}
      <div className="flex justify-center gap-2 mt-4">
        {agents.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIdx(i);
              setIsPaused(false);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === idx 
                ? 'bg-white scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to ${agents[i].name}`}
          />
        ))}
      </div>
    </div>
  );
}
