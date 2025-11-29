"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-20 sm:pb-0 bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Premium geometric accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-8"
          >
            <TrendingDown className="w-4 h-4 text-black mr-2" />
            <span className="text-sm font-semibold text-black/70">85-90% Cost Reduction vs Cloud APIs</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-[1.05] mb-8 tracking-tight"
          >
            Cut AI costs by{" "}
            <span className="gradient-text">80-90%</span>
            <br />
            <span className="text-black">own your infrastructure</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-4xl leading-relaxed mb-12 font-light"
          >
            Deploy production-ready LLMs and AI agents for your clients. 
            <span className="font-semibold text-black"> Same quality, massive savings,</span> complete ownership.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-6 mb-12"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black">85-90%</div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black">2-4 weeks</div>
                <div className="text-sm text-gray-600">To Production</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black">100%</div>
                <div className="text-sm text-gray-600">Data Ownership</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-black rounded-xl hover:bg-gray-800 transition-all premium-shadow-lg hover:premium-shadow"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all premium-shadow"
            >
              Calculate Savings
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
