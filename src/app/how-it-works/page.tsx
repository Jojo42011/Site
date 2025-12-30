"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MousePointer,
  Wrench,
  Rocket,
  Check
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: MousePointer,
    title: "Choose",
    subtitle: "Templates for speed OR Partnership for flexibility",
    description: "Pick your path based on what you need. Templates let you start selling same-day. Full partnership gives you unlimited custom automations built to spec.",
    details: [
      "Browse our template library for common use cases",
      "Or apply for partnership for custom builds",
      "Templates: $500-1,000 one-time, deploy unlimited times",
      "Partnership: Revenue share or monthly retainer",
    ],
  },
  {
    number: "02",
    icon: Wrench,
    title: "Deploy",
    subtitle: "We handle setup, integrations, and technical work",
    description: "We do all the heavy lifting. Templates come with setup guides for same-day deployment. Custom builds are ready in 3-7 days with native integrations.",
    details: [
      "Direct API integrations (no Zapier/n8n needed)",
      "CRM, calendar, payment system connections",
      "White-label configuration",
      "Quality testing before handoff",
    ],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Sell",
    subtitle: "White-label to your clients, keep premium margins",
    description: "Start selling to your clients immediately. It's your brand, your relationship, your recurring revenue. We're invisible infrastructure.",
    details: [
      "Zero Aethon branding visible to clients",
      "You set your own pricing",
      "$0.06/min cost means massive margins",
      "We handle support and maintenance",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Premium luxurious purple background designs */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Three Simple Steps</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From choosing your path to selling voice agents. We handle the tech, you handle the sales.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl premium-shadow-lg border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                  <div className="grid md:grid-cols-12 gap-0">
                    {/* Step Number & Icon */}
                    <div className="md:col-span-2 bg-gradient-to-br from-black via-gray-900 to-black p-8 flex flex-col items-center justify-center text-center">
                      <div className="text-5xl font-bold text-white/20 mb-4">{step.number}</div>
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-10 p-8 sm:p-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">{step.title}</h3>
                      <p className="text-purple-600 font-medium mb-4">{step.subtitle}</p>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{step.description}</p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[calc(8.33%+2rem)] top-full w-0.5 h-8 bg-gradient-to-b from-black to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-3xl p-8 sm:p-12 mb-20 border border-gray-100"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-black mb-2">Same Day</div>
                <div className="text-gray-600 font-medium">Template Deployment</div>
                <div className="text-sm text-gray-500 mt-1">Start selling immediately</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-black mb-2">3-7 Days</div>
                <div className="text-gray-600 font-medium">Custom Builds</div>
                <div className="text-sm text-gray-500 mt-1">Full partnership projects</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-black mb-2">60%</div>
                <div className="text-gray-600 font-medium">Cost Savings</div>
                <div className="text-sm text-gray-500 mt-1">vs. Retell/Vapi</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Choose templates for speed or partnership for flexibility. Either way, you&apos;ll be selling voice agents within days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Browse Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
