"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Crown,
  Lock,
  Zap,
  DollarSign,
  Settings,
  Shield,
  Server,
  Infinity,
  Mic,
  Brain,
  Plug,
  Globe
} from "lucide-react";
import Link from "next/link";

const comparisonData = [
  {
    feature: "Ownership",
    aethon: { value: "100% yours", highlight: true },
    vapi: { value: "You rent everything" },
    retell: { value: "You rent everything" },
    cloudRag: { value: "You rent everything" }
  },
  {
    feature: "Pricing Model",
    aethon: { value: "One-time build + hosting", highlight: true },
    vapi: { value: "Per-minute fees" },
    retell: { value: "Per-minute fees" },
    cloudRag: { value: "Per-query fees" }
  },
  {
    feature: "Monthly Cost at Scale",
    aethon: { value: "80-90% less", highlight: true },
    vapi: { value: "$8K-15K+" },
    retell: { value: "$8K-15K+" },
    cloudRag: { value: "$5K-15K+" }
  },
  {
    feature: "Customization",
    aethon: { value: "Unlimited—built from scratch", highlight: true },
    vapi: { value: "Limited to templates" },
    retell: { value: "Limited to templates" },
    cloudRag: { value: "API constraints" }
  },
  {
    feature: "Data Privacy",
    aethon: { value: "Data never leaves your servers", highlight: true },
    vapi: { value: "Data on their servers" },
    retell: { value: "Data on their servers" },
    cloudRag: { value: "Data on their servers" }
  },
  {
    feature: "Vendor Lock-in",
    aethon: { value: "None—you own the code", highlight: true },
    vapi: { value: "High—platform dependent" },
    retell: { value: "High—platform dependent" },
    cloudRag: { value: "High—API dependent" }
  },
  {
    feature: "Deployment Time",
    aethon: { value: "2-3 days", highlight: true },
    vapi: { value: "Hours (limited setup)" },
    retell: { value: "Hours (limited setup)" },
    cloudRag: { value: "Hours (limited setup)" }
  }
];

const possibilities = [
  {
    icon: Mic,
    title: "Voice Quality Control",
    description: "Custom voice training, emotion detection, natural interruption handling—we can tune every aspect of voice interaction."
  },
  {
    icon: Brain,
    title: "Logic Customization",
    description: "Complex decision trees, multi-step workflows, dynamic responses based on CRM data—no template limitations."
  },
  {
    icon: Plug,
    title: "Deep Integrations",
    description: "Direct database connections, custom API integrations, webhook orchestration—integrate with anything."
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "20+ languages with proper cultural nuances, code-switching support, regional dialects."
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "HIPAA, SOC2, GDPR—build compliance directly into your agent architecture."
  },
  {
    icon: Infinity,
    title: "Unlimited Scale",
    description: "No rate limits, no throttling, no per-unit caps. Scale as far as your infrastructure allows."
  }
];

const painPoints = [
  {
    problem: "Locked into per-minute pricing",
    impact: "Margins erode as you scale—success becomes expensive",
    solution: "Pay once for deployment, run unlimited calls"
  },
  {
    problem: "Can't customize beyond templates",
    impact: "Your agent sounds like everyone else's",
    solution: "Build exactly what you envision—no compromises"
  },
  {
    problem: "Data sits on third-party servers",
    impact: "Compliance risks, privacy concerns",
    solution: "Your data never leaves your infrastructure"
  },
  {
    problem: "Platform can change pricing anytime",
    impact: "Your business model is at their mercy",
    solution: "Own your code—no one can raise your prices"
  }
];

export default function WhyCustomAgentsPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Premium luxurious purple background designs */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
              <Crown className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold text-black">Own vs. Rent</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">Why Build Custom</span>
              <br />
              <span className="gradient-text">Instead of Renting?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Vapi, Retell, and cloud RAG providers charge per-minute or per-query fees. At scale, you&apos;re paying $8K-15K+/month for AI you don&apos;t own. There&apos;s a better way.
            </p>
          </motion.div>

          {/* The Core Problem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-10 text-center">The Problem with Cloud AI Platforms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 premium-shadow border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">{point.problem}</h4>
                      <p className="text-red-600 text-sm">{point.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-green-700 font-medium text-sm">{point.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Comparison Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-10 text-center">Feature Comparison</h2>
            <div className="bg-white rounded-3xl premium-shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-black via-gray-900 to-black">
                      <th className="text-left p-6 text-white font-bold">Feature</th>
                      <th className="text-center p-6">
                        <div className="text-white font-bold">Aethon</div>
                        <div className="text-purple-300 text-xs font-normal">Custom Built</div>
                      </th>
                      <th className="text-center p-6">
                        <div className="text-gray-400 font-bold">Vapi</div>
                        <div className="text-gray-500 text-xs font-normal">Voice Platform</div>
                      </th>
                      <th className="text-center p-6">
                        <div className="text-gray-400 font-bold">Retell</div>
                        <div className="text-gray-500 text-xs font-normal">Voice Platform</div>
                      </th>
                      <th className="text-center p-6">
                        <div className="text-gray-400 font-bold">Cloud RAG</div>
                        <div className="text-gray-500 text-xs font-normal">Knowledge APIs</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                        <td className="p-6 font-semibold text-black border-r border-gray-100">{row.feature}</td>
                        <td className="p-6 text-center border-r border-gray-100">
                          <span className={`inline-flex items-center gap-1 ${row.aethon.highlight ? "text-green-700 font-bold" : "text-gray-700"}`}>
                            {row.aethon.highlight && <Check className="w-4 h-4" />}
                            {row.aethon.value}
                          </span>
                        </td>
                        <td className="p-6 text-center text-gray-500 border-r border-gray-100">{row.vapi.value}</td>
                        <td className="p-6 text-center text-gray-500 border-r border-gray-100">{row.retell.value}</td>
                        <td className="p-6 text-center text-gray-500">{row.cloudRag.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* What's Possible */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">What&apos;s Possible When Building Custom</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Since we build from scratch, there are no template limitations. Here&apos;s what becomes possible:
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {possibilities.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 premium-shadow hover:premium-shadow-lg transition-all border border-gray-100 hover:border-gray-200 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-black text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cost Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-3xl p-8 sm:p-12 border border-gray-100">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 text-center">The Economics at Scale</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black">Cloud AI Platforms</h4>
                      <p className="text-sm text-gray-500">Vapi, Retell, Cloud RAG</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">10,000 call minutes/month</span>
                      <span className="font-bold text-red-600">$1,500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">50,000 call minutes/month</span>
                      <span className="font-bold text-red-600">$7,500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">100,000 call minutes/month</span>
                      <span className="font-bold text-red-600">$15,000+</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold text-black">Annual Cost (100K min)</span>
                        <span className="font-bold text-red-600">$180,000+</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Aethon Custom Build</h4>
                      <p className="text-sm text-gray-400">Own your infrastructure</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">One-time development</span>
                      <span className="font-bold text-white">Custom quote</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Monthly hosting (all volume)</span>
                      <span className="font-bold text-white">$800-1,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Per-minute costs</span>
                      <span className="font-bold text-green-400">$0</span>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold text-white">Annual Savings</span>
                        <span className="font-bold text-green-400">$156,000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Own Your AI?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Stop renting AI infrastructure at premium prices. Build custom agents that you own completely—deployed in 2-3 days, saving 80-90% monthly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
