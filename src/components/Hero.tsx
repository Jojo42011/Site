"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const companies = [
  "DocuFlow AI",
  "ChatSupport Pro",
  "LegalTech Solutions",
  "CodeAssist Platform",
  "AnalyticsHub",
  "ContentGen AI",
  "CustomerIQ",
  "DataVault Systems",
  "SmartDocs AI",
  "AutoEmail Pro",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-0">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient Orbs - Darker and more subtle */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-10 animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl opacity-10 animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <div className="space-y-6 sm:space-y-8 text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-4"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Save 80%+ on AI API Bills
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              >
                Stop Burning Cash on{" "}
                <span className="gradient-text">OpenAI Bills</span>
              </motion.h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                Run Claude-quality AI agents for <span className="text-green-400 font-bold">1/10th the cost</span> on your own servers.
                Private, secure, and yours to control.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-8 text-sm"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">$50K/mo</div>
                  <div className="text-gray-400">Typical OpenAI Bill</div>
                </div>
                <div className="text-purple-glow text-3xl">→</div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-400">$5K/mo</div>
                  <div className="text-gray-400">With Private LLMs</div>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-base sm:text-lg hover:scale-105 transition-transform glow-purple flex items-center justify-center space-x-2 text-white"
              >
                <span className="text-white">Get Free Savings Audit</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform text-white" />
              </Link>
              <a
                href="#calculator"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border border-purple-glow/30 text-gray-200 hover:border-purple-glow/60 transition-colors text-center"
              >
                Calculate Your Savings
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative glass-effect rounded-2xl p-6 sm:p-8 border border-purple-glow/20 mt-8 lg:mt-0"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <span className="text-sm font-semibold text-gray-300">Cost Comparison</span>
              <span className="text-xs text-green-400 font-semibold">Live Pricing</span>
            </div>

            <div className="space-y-4">
              {/* OpenAI Pricing */}
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">OpenAI GPT-4</span>
                  <span className="text-xs text-red-400">Cloud API</span>
                </div>
                <div className="text-2xl font-bold text-red-400">$3.00</div>
                <div className="text-xs text-gray-500">per 1M tokens</div>
              </div>

              {/* Anthropic Pricing */}
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Anthropic Claude</span>
                  <span className="text-xs text-red-400">Cloud API</span>
                </div>
                <div className="text-2xl font-bold text-red-400">$3.00</div>
                <div className="text-xs text-gray-500">per 1M tokens</div>
              </div>

              {/* Your Pricing */}
              <div className="p-4 rounded-lg bg-green-500/10 border-2 border-green-500/30 relative">
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 rounded-full text-xs font-bold text-white">
                  Best
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-semibold">Aethon Private LLMs</span>
                  <span className="text-xs text-green-400">Your Servers</span>
                </div>
                <div className="text-3xl font-bold text-green-400">$0.30</div>
                <div className="text-xs text-gray-400">per 1M tokens</div>
                <div className="mt-2 pt-2 border-t border-green-500/20">
                  <div className="text-xs text-green-400 font-bold">90% savings</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="text-xs text-gray-400 text-center">
                Based on typical SaaS workloads
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logo Carousel */}
        <div className="mt-12 sm:mt-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500 text-center sm:text-left">Trusted by SaaS Founders</p>
          <div className="relative overflow-hidden logo-carousel">
            <div className="logo-track">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company}-${index}`}
                  className="px-6 py-3 text-white font-semibold border border-white/10 rounded-full bg-white/10 backdrop-blur-sm"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

