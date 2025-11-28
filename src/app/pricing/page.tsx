"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceTiers from "@/components/ServiceTiers";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-600 text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Transparent Pricing, Massive Savings
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Simple Pricing</span>{" "}
            <span className="text-gray-900">for SaaS Founders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            One-time setup fee, then just your monthly server costs. No hidden charges, no vendor lock-in.
            Cut your AI bills by 80-90% starting next month.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 shadow-sm"
          >
            <span className="text-green-600 font-bold mr-2">$2,500-7,500</span>
            <span>setup cost + </span>
            <span className="text-green-600 font-bold ml-2">$200-800/mo</span>
            <span className="ml-2">operating cost</span>
          </motion.div>
        </div>
      </section>

      {/* Service Tiers */}
      <ServiceTiers />

      {/* Why This Works Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Private LLMs are <span className="gradient-text">10x Cheaper</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cloud AI providers charge for convenience and markup. You&apos;re paying for their profit margins, not compute costs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "No Cloud Markup",
                description: "Cloud providers charge $3/M tokens. Actual compute cost is ~$0.30. You keep the difference.",
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
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <h3 className="text-gray-900 font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 sm:p-12 text-center border border-purple-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Cut Your AI Bills by 80%?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a free 15-minute savings audit. We&apos;ll show you exactly how much you could save with private LLMs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-lg text-white hover:scale-105 transition-transform shadow-md hover:shadow-lg"
              >
                Get Free Savings Audit
              </Link>
              <Link
                href="/#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-lg text-gray-900 hover:border-purple-300 hover:bg-purple-50 transition-all"
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
