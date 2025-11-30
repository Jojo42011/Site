"use client";

import { motion } from "framer-motion";
import { 
  Phone, 
  Database,
  Check,
  Crown,
  Server,
  TrendingDown,
  Zap,
  Lock,
  Shield,
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
    tagline: "The Retell & Vapi Alternative You Own",
    description: "Deploy production-ready AI voice agents on your infrastructure. Human-like conversations, real-time processing, seamless call handling—without the per-minute API fees that drain your margins.",
    features: [
      { icon: Crown, text: "100% Ownership—your code, your data, your infrastructure" },
      { icon: TrendingDown, text: "80-90% less than Retell/Vapi at scale" },
      { icon: Zap, text: "Sub-300ms latency with local LLMs" },
      { icon: Lock, text: "Complete data privacy—calls never leave your servers" }
    ],
    comparison: {
      competitor: "Retell / Vapi",
      competitorCost: "$8K-15K/mo",
      savings: "80-90% Less"
    },
    perfectFor: "AI agencies, SaaS founders, and sales teams"
  },
  {
    id: "rag-agent",
    icon: Database,
    badge: "Enterprise Ready",
    title: "RAG Knowledge Agent",
    tagline: "Private Knowledge Base on Local LLMs",
    description: "Build intelligent knowledge systems that search and answer questions from your documents—100% local. No API calls to OpenAI. No data leaving your servers. No per-query costs.",
    features: [
      { icon: Server, text: "Runs 100% locally—zero external API calls" },
      { icon: TrendingDown, text: "Zero per-query costs vs cloud RAG" },
      { icon: Shield, text: "Air-gapped ready for sensitive data" },
      { icon: Infinity, text: "Unlimited queries—no token limits or throttling" }
    ],
    comparison: {
      competitor: "Cloud RAG APIs",
      competitorCost: "$5K-15K/mo",
      savings: "80-90% Less"
    },
    perfectFor: "Agencies, SaaS products, and enterprises with sensitive docs"
  }
];

export default function Products() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
            <span className="text-sm font-semibold text-black">Own Your AI Infrastructure</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-black">AI products you own</span>{" "}
            <span className="gradient-text">not rent</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop bleeding money on per-minute and per-query cloud fees. Deploy production-ready AI agents on your infrastructure—same quality as Retell, Vapi, and cloud RAG, but you own everything.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl overflow-hidden premium-shadow hover:premium-shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <product.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="inline-flex items-center px-2 py-0.5 bg-white/20 rounded-full mb-1">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{product.badge}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-2">
                        <div className="text-green-400 text-[10px] font-medium uppercase tracking-wider">Save</div>
                        <div className="text-white text-lg font-bold">{product.comparison.savings}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm font-medium">{product.tagline}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          <feature.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Cost Comparison */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">{product.comparison.competitor}</div>
                        <div className="text-lg font-bold text-gray-400 line-through">{product.comparison.competitorCost}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">With Aethon</div>
                        <div className="text-lg font-bold text-black">{product.comparison.savings}</div>
                      </div>
                    </div>
                  </div>

                  {/* Perfect For */}
                  <div className="text-sm text-gray-500 mb-6">
                    <span className="font-medium text-gray-700">Perfect for:</span> {product.perfectFor}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all group-hover:scale-[1.02] transform"
                  >
                    Order {product.title}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all premium-shadow hover:premium-shadow-lg"
          >
            View Full Product Details
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-black rounded-3xl p-12 text-center premium-shadow-lg"
        >
          <h3 className="text-3xl font-bold text-white mb-4 text-center">
            Own Your AI. Stop Renting.
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Founders are wasting $8K-15K/month on cloud AI they don&apos;t own. Deploy the same quality AI agents on your infrastructure for 80-90% less—with complete ownership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="/#calculator"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Calculate Savings
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
