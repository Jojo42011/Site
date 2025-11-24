"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const companies = [
  "Meridian Health Systems",
  "Summit Financial Group",
  "Nexus Defense Solutions",
  "Apex Medical Group",
  "Pinnacle Trust Bank",
  "Aegis Security Group",
  "Cascade Healthcare",
  "Horizon Capital",
  "Crestwood Legal Partners",
  "Vanguard Health Network",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient Orbs - Darker and more subtle */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-10 animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl opacity-10 animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8 text-left">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight"
              >
                Privatized AI infrastructure for Institutions
              </motion.h1>
              <p className="mt-6 text-xl text-gray-300 max-w-xl">
                Air-gapped AI systems powered by secure infrastructure. Zero cloud dependencies. Maximum security.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-lg hover:scale-105 transition-transform glow-purple flex items-center justify-center space-x-2 text-white"
              >
                <span className="text-white">Schedule Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-semibold text-lg border border-purple-glow/30 text-gray-200 hover:border-purple-glow/60 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative glass-effect rounded-2xl p-6 border border-purple-glow/20"
          >
            <div className="flex items-center space-x-2 pb-4 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-400">Private LLM Session</span>
            </div>
            <div className="space-y-4 py-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">User</p>
                <div className="p-3 rounded-lg bg-white/5 text-sm text-gray-300">
                  Analyze patient data access patterns
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">AI Response</p>
                <div className="p-3 rounded-lg bg-purple-glow/10 text-sm text-gray-200 border border-purple-glow/20">
                  Processing secure analysis... All data remains on-premises.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logo Carousel */}
        <div className="mt-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Trusted by privacy-first teams</p>
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

