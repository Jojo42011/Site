"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-20 sm:pb-0 bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-5xl">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-[1.05] mb-8 tracking-tight"
          >
            Create Custom Automations That <span className="gradient-text">Sell</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-4xl leading-relaxed mb-12 font-light"
          >
            Build voice automations that have been proven to sell. Connect everything on one dashboard and deploy in minutes. 
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://renovated-detailing-voice-agent.fly.dev/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-black rounded-xl hover:bg-gray-800 transition-all premium-shadow-lg hover:premium-shadow"
            >
              Try Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all premium-shadow"
            >
              Browse Dashboards
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-8 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium">Proven to Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium">Deploy in Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium">No Zapier, No n8n</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
