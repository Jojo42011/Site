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
  TrendingDown,
  Lock,
  Infinity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "call-agent",
    icon: Phone,
    badge: "Most Popular",
    title: "AI Call Agent",
    tagline: "Own Your Voice AI. Stop Renting.",
    headline: "The Retell & Vapi Alternative That Actually Makes Sense",
    description: "Deploy production-ready AI voice agents on your own infrastructure. Same quality as Retell and Vapi—human-like conversations, real-time processing, seamless call handling—but you own everything. No per-minute API fees. No vendor lock-in. No surprises on your monthly bill.",
    problem: "Cloud voice AI platforms charge $0.10-0.30+ per minute. At scale, that's $8K-15K/month bleeding out of your business—and you don't own a single line of code.",
    solution: "Our AI Call Agents run on local LLMs with your infrastructure. Pay once for deployment, own it forever. Your margins stay intact.",
    features: [
      {
        icon: Crown,
        title: "100% Ownership",
        description: "Your code, your infrastructure, your data. No vendor can shut you down or raise prices."
      },
      {
        icon: TrendingDown,
        title: "80-90% Cost Reduction",
        description: "Eliminate per-minute API fees. What costs $10K/mo on Retell costs $800-1,200/mo with us."
      },
      {
        icon: Zap,
        title: "Same Speed & Quality",
        description: "Sub-300ms latency. Natural conversations. Real-time transcription. Enterprise-grade reliability."
      },
      {
        icon: Lock,
        title: "Complete Data Privacy",
        description: "Conversations never leave your servers. Perfect for healthcare, finance, and regulated industries."
      }
    ],
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
    comparison: {
      competitor: "Retell / Vapi",
      competitorCost: "$8,000 - $15,000/mo",
      competitorNote: "Per-minute fees at scale",
      ourCost: "80-90% Less",
      ourNote: "One-time deployment + minimal hosting"
    },
    perfectFor: [
      "AI agencies building voice solutions for clients",
      "SaaS founders adding voice AI to their products",
      "Call centers automating customer support",
      "Sales teams scaling outbound calling"
    ]
  },
  {
    id: "rag-agent",
    icon: Database,
    badge: "Enterprise Ready",
    title: "RAG Knowledge Agent",
    tagline: "Your Data. Your LLM. Your Advantage.",
    headline: "Private Knowledge Base Powered by Local LLMs",
    description: "Build intelligent knowledge systems that search, understand, and answer questions from your documents—all running on local LLMs. No API calls to OpenAI. No data leaving your servers. No per-query costs eating into your margins.",
    problem: "Cloud RAG solutions charge per query and require sending your sensitive documents to third-party servers. At scale, you're paying $5K-15K/month while your proprietary data sits on someone else's infrastructure.",
    solution: "Our RAG Agents use local embedding models and LLMs. Your documents stay private, your queries are free, and your knowledge base belongs to you.",
    features: [
      {
        icon: Server,
        title: "Runs 100% Locally",
        description: "Local LLMs + local embeddings. Zero API calls. Your data never touches external servers."
      },
      {
        icon: TrendingDown,
        title: "Zero Per-Query Costs",
        description: "Cloud RAG charges per query. We don't. Run unlimited queries for a flat hosting cost."
      },
      {
        icon: Shield,
        title: "Air-Gapped Ready",
        description: "Perfect for sensitive data. Deploy in air-gapped environments with no internet required."
      },
      {
        icon: Infinity,
        title: "Unlimited Scale",
        description: "No token limits. No rate limiting. Process millions of documents without throttling."
      }
    ],
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
    comparison: {
      competitor: "Cloud RAG APIs",
      competitorCost: "$5,000 - $15,000/mo",
      competitorNote: "Per-query fees + token costs",
      ourCost: "80-90% Less",
      ourNote: "Unlimited queries, flat hosting"
    },
    perfectFor: [
      "Agencies building custom knowledge bases for clients",
      "SaaS products with document Q&A features",
      "Enterprises with sensitive internal documents",
      "Legal & compliance teams searching contracts"
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
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
              <span className="text-sm font-semibold text-black">Own Your AI Infrastructure</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">Stop Paying Cloud Prices</span>
              <br />
              <span className="gradient-text">for AI You Don&apos;t Own</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deploy production-ready AI agents on your infrastructure. Same quality as Retell, Vapi, and cloud RAG solutions—but you own everything and pay 80-90% less monthly.
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
                          <div className="text-green-400 text-sm font-medium">Save vs Cloud</div>
                          <div className="text-white text-2xl font-bold">{product.comparison.ourCost}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-purple-200 text-lg font-medium mb-2">{product.tagline}</p>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-4xl">{product.headline}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 sm:p-12">
                    {/* Description */}
                    <p className="text-gray-600 text-lg leading-relaxed mb-10">
                      {product.description}
                    </p>

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
                      <h3 className="text-xl font-bold text-black mb-6">Why Founders Choose This</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
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
                      <h3 className="text-xl font-bold text-black mb-6">Full Capabilities</h3>
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

                    {/* Cost Comparison */}
                    <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl p-6 mb-10 border border-gray-100">
                      <h3 className="text-lg font-bold text-black mb-4">Cost Comparison</h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-5 border border-gray-200">
                          <div className="text-sm text-gray-500 mb-1">{product.comparison.competitor}</div>
                          <div className="text-2xl font-bold text-gray-400 line-through">{product.comparison.competitorCost}</div>
                          <div className="text-sm text-gray-500">{product.comparison.competitorNote}</div>
                        </div>
                        <div className="bg-black rounded-xl p-5">
                          <div className="text-sm text-gray-400 mb-1">With Aethon</div>
                          <div className="text-2xl font-bold text-white">{product.comparison.ourCost}</div>
                          <div className="text-sm text-gray-400">{product.comparison.ourNote}</div>
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
                        Order {product.title}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                      <Link
                        href="/#calculator"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black border-2 border-black rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                      >
                        Calculate Your Savings
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Own Your AI?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Stop paying cloud prices for AI you don&apos;t own. Get started with production-ready AI agents deployed on your infrastructure—complete ownership, massive savings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Link>
              <Link
                href="/#calculator"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Calculate Savings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
