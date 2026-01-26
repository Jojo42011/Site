"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, UserPlus, Package, Settings, Rocket } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign up",
    description: "Create your account. Fast and simple—you’re in within minutes.",
  },
  {
    number: "02",
    icon: Package,
    title: "Choose automation",
    description: "Pick the voice automation that fits: Voice Receptionist, Spam Filter, or Outbound Sales Agent.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Configure",
    description: "Use the dashboard to configure your automation: set the greeting, connect your calendar and CRM, add your Twilio number. Everything in one place—no Zapier, no n8n.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Go live",
    description: "Your automation is live and ready to take calls. Start selling to your clients. We handle the hosting and infrastructure—you focus on sales.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
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
              <span className="gradient-text">How It Works</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four simple steps from sign-up to selling proven voice automations to your clients.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-8 mb-16">
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
                    <div className="md:col-span-2 bg-gradient-to-br from-black via-gray-900 to-black p-8 flex flex-col items-center justify-center text-center">
                      <div className="text-5xl font-bold text-white/20 mb-4">{step.number}</div>
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="md:col-span-10 p-8 sm:p-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[calc(8.33%+2rem)] top-full w-0.5 h-8 bg-gradient-to-b from-black to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Dashboard Image - for "Begin building" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 premium-shadow-lg bg-white">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-700">Your dashboard — create agents, set prompts, and deploy.</p>
              </div>
              <div className="relative w-full aspect-[16/10] bg-gray-100">
                <Image
                  src="/dashboard.png"
                  alt="Aethon Voice Receptionist dashboard showing agent configuration, AI models, and system prompt"
                  fill
                  className="object-contain object-top"
                  sizes="(max-width: 1024px) 100vw, 1280px"
                />
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
              Try the demo or browse voice automations. You&apos;ll be building in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://renovated-detailing-voice-agent.fly.dev/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Try Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                href="/pricing"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Browse Voice Automations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
