"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-20 sm:pb-0 bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Premium geometric accents with light purple */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-300/15 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-5xl">
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
