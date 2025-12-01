"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Phone, 
  Database,
  ArrowLeft,
  Check,
  Shield,
  Zap,
  Crown,
  Server,
  Lock,
  Infinity,
  ArrowRight,
  Clock,
  Palette,
  Users,
  TrendingUp,
  Tag,
  X
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "call-agent",
    icon: Phone,
    badge: "Most Popular",
    title: "Voice Agents",
    tagline: "Deploy in 2-3 Days",
    description: "Custom voice agents built for your clients. Full ownership, unlimited customization, and enterprise-grade reliability. Deploy on your client's infrastructure or yours—you own the code, the relationship, and the margins.",
    problem: "You want to offer voice AI to your clients, but cloud solutions limit your customization and eat your margins. When reselling cloud platforms, you're offering someone else's product at 30% margin. Your clients can buy direct. You don't own the relationship.",
    solution: "Custom voice agents built in 2-3 days. Deploy on your client's infrastructure or yours. You own the code, you own the relationship, you own the margins. Full customization. Zero limitations.",
    features: [
      {
        icon: Clock,
        title: "Deploy in 2-3 Days",
        description: "Production-ready voice agents delivered fast. No months of development. Start serving clients immediately."
      },
      {
        icon: Palette,
        title: "Full Customization",
        description: "No template limits. Build exactly what your clients need with unlimited feature customization."
      },
      {
        icon: Users,
        title: "100% Client Ownership",
        description: "Your clients own the code and infrastructure. Lock them in with you, not a third-party platform."
      },
      {
        icon: TrendingUp,
        title: "80%+ Profit Margins",
        description: "Stop reselling at 30% margin. Build custom and keep 80-90% of every deal."
      },
      {
        icon: Lock,
        title: "Complete Data Privacy",
        description: "Conversations never leave your servers. Enterprise-ready for healthcare, finance, and regulated industries."
      },
      {
        icon: Tag,
        title: "White-Label Ready",
        description: "Rebrand completely as your own solution. Your clients see your brand, not ours."
      }
    ],
    capabilitiesIntro: "Fully customizable voice agents with unlimited features",
    capabilities: [
      "Real-time voice processing with sub-300ms latency",
      "Multi-language support (20+ languages)",
      "Call transcription & sentiment analysis",
      "Seamless handoff to human agents",
      "Custom voice cloning & personalities",
      "CRM & calendar integrations",
      "Call recording & analytics dashboard",
      "Outbound & inbound call handling"
    ],
    margin: {
      clientPays: "$5K/month",
      clientPaysLabel: "for custom voice agent",
      yourCost: "~$500/month",
      yourCostLabel: "deployment + hosting",
      yourMargin: "$4,500/month",
      yourMarginPercent: "90%+"
    },
    perfectFor: [
      "AI agencies building premium voice solutions for enterprise clients",
      "SaaS platforms with white-label voice needs",
      "Agencies in healthcare/finance (regulated industries)",
      "Teams that need air-gapped, private deployments"
    ]
  },
  {
    id: "rag-agent",
    icon: Database,
    badge: "Enterprise Ready",
    title: "Knowledge Agents",
    tagline: "Deploy in 2-3 Days",
    description: "Custom knowledge systems built for your enterprise clients. 100% local, zero external API calls. Your clients own the infrastructure, the data, and the solution. Air-gapped ready and fully customizable.",
    problem: "You're building RAG solutions for enterprise clients, but cloud options limit customization and data privacy. Per-query costs scale unpredictably. Your clients worry about their data. You can't truly own the solution.",
    solution: "Custom knowledge agents built in 2-3 days. 100% local, zero external API calls. Your clients own the infrastructure, the data, and the solution. Air-gapped ready. Fully customizable.",
    features: [
      {
        icon: Clock,
        title: "Deploy in 2-3 Days",
        description: "Production-ready knowledge agents delivered fast. No months of development. Start serving clients immediately."
      },
      {
        icon: Palette,
        title: "Full Customization",
        description: "No template limits. Build exactly what your clients need with unlimited integrations and features."
      },
      {
        icon: Users,
        title: "100% Client Ownership",
        description: "Your clients own the code and infrastructure. Lock them in with you, not a third-party platform."
      },
      {
        icon: TrendingUp,
        title: "80%+ Profit Margins",
        description: "Stop reselling at 30% margin. Build custom and keep 80-90% of every deal."
      },
      {
        icon: Shield,
        title: "Complete Data Privacy",
        description: "Documents never leave your servers. Air-gapped ready for the most sensitive enterprise data."
      },
      {
        icon: Tag,
        title: "White-Label Ready",
        description: "Rebrand completely as your own solution. Your clients see your brand, not ours."
      }
    ],
    capabilitiesIntro: "Fully customizable knowledge systems with unlimited integrations",
    capabilities: [
      "Semantic search across all document types",
      "PDF, Word, Excel, PowerPoint support",
      "Real-time document indexing",
      "Multi-tenant architecture",
      "Fine-grained access controls",
      "Citation & source tracking",
      "Conversational follow-up queries",
      "API & webhook integrations"
    ],
    margin: {
      clientPays: "$4K/month",
      clientPaysLabel: "for custom knowledge system",
      yourCost: "~$400/month",
      yourCostLabel: "deployment + hosting",
      yourMargin: "$3,600/month",
      yourMarginPercent: "90%+"
    },
    perfectFor: [
      "AI agencies building custom knowledge bases for enterprise clients",
      "SaaS platforms with white-label document Q&A needs",
      "Agencies serving clients with sensitive internal documents",
      "Teams in legal, compliance, or regulated industries"
    ]
  }
];

export default function ProductsPage() {
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">Build AI Solutions</span>
              <br />
              <span className="gradient-text">Your Clients Love</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deploy enterprise-grade agents in 2-3 days. Your clients own the code, the data, and the relationship. You keep 80%+ margins.
            </p>
          </motion.div>

          {/* Products */}
          <div className="space-y-16 mb-20">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative"
              >
                {/* Product Card */}
                <div className="bg-white rounded-3xl premium-shadow-lg border border-gray-100 overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-black via-gray-900 to-black p-8 sm:p-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                          <product.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full mb-2">
                            <span className="text-xs font-bold text-white">{product.badge}</span>
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-bold text-white">{product.title}</h2>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-3">
                          <div className="text-green-400 text-sm font-medium">Your Margin</div>
                          <div className="text-white text-2xl font-bold">{product.margin.yourMarginPercent}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-purple-200 text-lg font-medium mb-2">{product.tagline}</p>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-4xl">{product.description}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 sm:p-12">
                    {/* Problem / Solution */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                      <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 font-bold text-sm">✕</span>
                          </div>
                          <h4 className="font-bold text-red-900">The Problem</h4>
                        </div>
                        <p className="text-red-800/80 leading-relaxed">{product.problem}</p>
                      </div>
                      <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <h4 className="font-bold text-green-900">Our Solution</h4>
                        </div>
                        <p className="text-green-800/80 leading-relaxed">{product.solution}</p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-10">
                      <h3 className="text-xl font-bold text-black mb-6">Why Agencies Choose This</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.features.map((feature, i) => (
                          <div 
                            key={i}
                            className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                                <feature.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-black mb-1">{feature.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="mb-10">
                      <h3 className="text-xl font-bold text-black mb-2">Full Capabilities</h3>
                      <p className="text-gray-600 mb-6">{product.capabilitiesIntro}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {product.capabilities.map((capability, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Margin Calculator */}
                    <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl p-6 mb-10 border border-gray-100">
                      <h3 className="text-lg font-bold text-black mb-4">Your Margin When You Build With Aethon</h3>
                      <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
                          <div className="text-sm text-gray-500 mb-1">Client Pays</div>
                          <div className="text-2xl font-bold text-black">{product.margin.clientPays}</div>
                          <div className="text-sm text-gray-500">{product.margin.clientPaysLabel}</div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
                          <div className="text-sm text-gray-500 mb-1">Your Cost</div>
                          <div className="text-2xl font-bold text-gray-600">{product.margin.yourCost}</div>
                          <div className="text-sm text-gray-500">{product.margin.yourCostLabel}</div>
                        </div>
                        <div className="bg-black rounded-xl p-5 text-center">
                          <div className="text-sm text-gray-400 mb-1">Your Margin</div>
                          <div className="text-2xl font-bold text-white">{product.margin.yourMargin}</div>
                          <div className="text-sm text-green-400 font-medium">({product.margin.yourMarginPercent})</div>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-4">
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span className="text-gray-600">When reselling cloud solutions: <span className="font-semibold text-red-600">30% margin</span>, clients can buy direct</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">When building with Aethon: <span className="font-semibold text-green-600">90%+ margin</span>, clients locked in with you</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Perfect For */}
                    <div className="mb-10">
                      <h3 className="text-xl font-bold text-black mb-4">Perfect For</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.perfectFor.map((item, i) => (
                          <div 
                            key={i}
                            className="px-4 py-2 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-900 font-medium"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all premium-shadow-lg hover:scale-[1.02] transform"
                      >
                        Build Your First Agent
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                      <Link
                        href="/#calculator"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black border-2 border-black rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                      >
                        See Margin Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Not Just Resell Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-white rounded-3xl premium-shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center">
                  Why Not Just Resell Cloud Platforms?
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Problems with reselling */}
                  <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                    <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                      <X className="w-5 h-5" />
                      Reselling Cloud Platforms
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Limited to their templates",
                        "Your clients can buy direct (30% margin)",
                        "Per-minute fees scale unpredictably",
                        "You don't own the relationship",
                        "Vendor lock-in (they can change pricing)"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-red-800/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits of building custom */}
                  <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6">
                    <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Build Custom With Aethon
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Unlimited customization",
                        "Clients own it, locked in with you",
                        "Flat deployment cost, unlimited scale",
                        "You own the relationship",
                        "90%+ margins (not 30%)"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800/80">{item}</span>
                        </div>
                      ))}
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
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Own Your AI Business?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Build premium AI solutions for your clients. Deploy in 2-3 days, keep 80%+ margins, and own every relationship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Build Your First Agent
              </Link>
              <Link
                href="/#calculator"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                See Margin Calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
