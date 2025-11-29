"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="text-black">Ready to Cut Your</span>{" "}
            <span className="gradient-text">AI Costs by 80%?</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join AI founders who&apos;ve already made the switch. Book a free 15-minute savings audit
            and see exactly how much you could save.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="group px-8 py-4 bg-black rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 text-white"
            >
              <span>Get Free Savings Audit</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#calculator"
              className="px-8 py-4 border-2 border-black rounded-lg font-semibold text-lg text-black hover:bg-black hover:text-white transition-all"
            >
              Calculate My Savings
            </a>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>2-4 Week Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span>85% Average Savings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
