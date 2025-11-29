"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            <span className="text-black">Ready to Cut Your</span>{" "}
            <span className="gradient-text">AI Costs by 80%?</span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Join AI founders who&apos;ve already made the switch. Book a free 15-minute savings audit
            and see exactly how much you could save.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/products"
              className="group px-10 py-5 bg-black rounded-xl font-bold text-lg hover:bg-gray-800 transition-all premium-shadow-lg hover:premium-shadow flex items-center space-x-2 text-white"
            >
              <span>See our Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 border-2 border-black rounded-xl font-bold text-lg text-black hover:bg-black hover:text-white transition-all premium-shadow"
            >
              Get Started Today
            </Link>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-base text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="font-medium">2-4 Week Setup</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="font-medium">85% Average Savings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
