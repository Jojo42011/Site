"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceTiers from "@/components/ServiceTiers";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Transparent Pricing, Massive Savings
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Simple Pricing</span>{" "}
            <span className="text-white">for SaaS Founders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            One-time setup fee, then just your monthly server costs. No hidden charges, no vendor lock-in.
            Cut your AI bills by 80-90% starting next month.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-gray-300"
          >
            <span className="text-green-400 font-bold mr-2">$2,500-7,500</span>
            <span>setup cost + </span>
            <span className="text-green-400 font-bold ml-2">$200-800/mo</span>
            <span className="ml-2">operating cost</span>
          </motion.div>
        </div>
      </section>

      {/* Service Tiers */}
      <ServiceTiers />

      {/* Why This Works Section */}
      <section className="relative py-24 bg-charcoal-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Private LLMs are <span className="gradient-text">10x Cheaper</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Cloud AI providers charge for convenience and markup. You&apos;re paying for their profit margins, not compute costs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "No Cloud Markup",
                description: "OpenAI/Anthropic charge $3/M tokens. Actual compute cost is ~$0.30. You keep the difference.",
              },
              {
                title: "Open Source Models",
                description: "Llama, Mixtral, DeepSeek are free. Same quality as GPT-4, zero licensing fees.",
              },
              {
                title: "Your Hardware",
                description: "A $500/mo server handles what costs $10K+ on cloud APIs. You own the infrastructure.",
              },
              {
                title: "No Rate Limits",
                description: "Scale infinitely by adding servers. No throttling, no usage caps, no surprise bills.",
              },
              {
                title: "Data Privacy",
                description: "Your customer data stays on your servers. No third-party access, complete compliance.",
              },
              {
                title: "No Vendor Lock-in",
                description: "Models run on your infrastructure. Switch providers anytime, zero migration cost.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover:border-purple-glow/60 transition-all"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Cut Your AI Bills by 80%?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book a free 15-minute savings audit. We&apos;ll show you exactly how much you could save with private LLMs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-lg text-white hover:scale-105 transition-transform glow-purple"
              >
                Get Free Savings Audit
              </Link>
              <Link
                href="/#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-purple-glow/30 rounded-xl font-semibold text-lg text-white hover:border-purple-glow/60 hover:bg-purple-glow/10 transition-all"
              >
                Calculate Your Savings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
