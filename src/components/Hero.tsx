"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-0 bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Minimal geometric accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-4xl">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6"
          >
            Cut AI runtime and hosting costs by{" "}
            <span className="gradient-text">80-90%</span>
            <br />
            and own your systems
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed"
          >
            Deploy Dedicated LLMs and AI agents made to last for your clients. Same quality, Massive cost reduction and complete ownership.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all"
            >
              Calculate Savings
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
