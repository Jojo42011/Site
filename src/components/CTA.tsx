"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-glow/10 via-blue-electric/10 to-purple-glow/10" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-15 transform -translate-x-1/2" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-purple-glow" />
            <Lock className="w-8 h-8 text-blue-electric" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="text-gray-100">Ready to Deploy</span>{" "}
            <span className="gradient-text">Private AI?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule a secure demo and see how air-gapped AI can transform your institution
            without compromising data sovereignty.
          </p>

          <div className="flex items-center justify-center pt-4">
            <Link
              href="/contact"
              className="group px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-lg font-semibold text-lg hover:scale-105 transition-transform glow-purple flex items-center space-x-2 text-white"
            >
              <span>Schedule Secure Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Confidential Consultation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

