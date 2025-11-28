"use client";

import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Zap } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-purple-50 to-green-50 opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <DollarSign className="w-8 h-8 text-green-600" />
            <Zap className="w-8 h-8 text-purple-600" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="text-gray-900">Ready to Cut Your</span>{" "}
            <span className="gradient-text">AI Bills by 80%?</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join 47+ SaaS founders who&apos;ve already made the switch. Book a free 15-minute savings audit
            and see exactly how much you could save.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold text-lg hover:scale-105 transition-transform shadow-md hover:shadow-lg flex items-center space-x-2 text-white"
            >
              <span>Get Free Savings Audit</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#calculator"
              className="px-8 py-4 border-2 border-gray-300 rounded-lg font-semibold text-lg text-gray-900 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              Calculate My Savings
            </a>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>2-4 Week Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>85% Average Savings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
