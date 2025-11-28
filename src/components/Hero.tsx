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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-0 bg-white">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Gradient Orbs - Subtle */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <div className="space-y-6 sm:space-y-8 text-left">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
              >
                Cut Your AI Bills by{" "}
                <span className="text-gray-900">90%</span>
                <br />
                <span className="gradient-text">& Own Your Infrastructure</span>
              </motion.h1>
              <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                Deploy private LLMs and AI agents on your own servers. Same quality, 1/10th the cost.
                Complete control, zero vendor lock-in.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 inline-flex items-center gap-6 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
              >
                <div>
                  <div className="text-3xl font-bold text-gray-900">$50K</div>
                  <div className="text-sm text-gray-500">Cloud APIs</div>
                </div>
                <div className="text-purple-600 text-2xl">→</div>
                <div>
                  <div className="text-3xl font-bold text-green-600">$5K</div>
                  <div className="text-sm text-gray-500">Self-Hosted</div>
                </div>
                <div className="ml-4 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-xs font-semibold text-green-700">90% savings</div>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-base sm:text-lg hover:scale-105 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-white"
              >
                <span>Get Free Savings Audit</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#calculator"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all text-center"
              >
                Calculate Your Savings
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative glass-effect rounded-2xl p-6 sm:p-8 border border-gray-200 mt-8 lg:mt-0"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <span className="text-sm font-semibold text-gray-700">Cost Comparison</span>
              <span className="text-xs text-green-600 font-semibold">Live Pricing</span>
            </div>

            <div className="space-y-3">
              {/* Cloud Pricing */}
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Cloud AI APIs</span>
                  <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-md font-medium">External</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">$3.00</div>
                <div className="text-xs text-gray-500">per 1M tokens</div>
              </div>

              {/* Your Pricing */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 relative">
                <div className="absolute -top-2.5 -right-2.5 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-xs font-bold text-white shadow-md">
                  Your Infrastructure
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Private LLMs</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md font-medium">Self-Hosted</span>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-1">$0.30</div>
                <div className="text-xs text-gray-600 mb-3">per 1M tokens</div>
                <div className="pt-3 border-t border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Monthly savings</span>
                    <span className="text-sm font-bold text-green-600">90%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                Based on typical SaaS workloads
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logo Carousel */}
        <div className="mt-12 sm:mt-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400 text-center sm:text-left">Trusted by SaaS Founders</p>
          <div className="relative overflow-hidden logo-carousel">
            <div className="logo-track">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company}-${index}`}
                  className="px-6 py-3 text-gray-700 font-semibold border border-gray-200 rounded-full bg-white shadow-sm"
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
