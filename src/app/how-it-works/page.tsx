"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Wrench,
  Server,
  Key,
  HeadphonesIcon,
  Clock,
  Check,
  Zap
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery & Consultation",
    duration: "Day 1",
    description: "We start with a focused consultation to understand your exact requirements. What does your agent need to do? What systems should it integrate with? What's your use case?",
    details: [
      "Deep dive into your business requirements",
      "Identify integration points (CRMs, calendars, databases)",
      "Define voice personality, tone, and conversation flows",
      "Scope custom features and capabilities",
      "Establish success metrics and KPIs"
    ],
    outcome: "Crystal clear specification document"
  },
  {
    number: "02",
    icon: Wrench,
    title: "Custom Agent Building",
    duration: "Days 1-2",
    description: "Unlike template-based platforms, we build your agent from scratch. Every component is custom-crafted to your specifications—no compromises, no 'that feature isn't available.'",
    details: [
      "Custom conversation logic and decision trees",
      "Voice training and personality configuration",
      "Integration development for your specific tools",
      "Fine-tuning for your industry terminology",
      "Quality assurance and conversation testing"
    ],
    outcome: "Production-ready custom AI agent"
  },
  {
    number: "03",
    icon: Server,
    title: "Local Model Deployment",
    duration: "Day 2-3",
    description: "We deploy your agent on infrastructure you control. Your models run locally—no data leaves your environment. This is what makes the 80-90% cost savings possible.",
    details: [
      "Local LLM deployment optimized for your hardware",
      "Vector database setup for RAG capabilities",
      "API endpoints and webhook configurations",
      "Performance optimization and load testing",
      "Security hardening and access controls"
    ],
    outcome: "Fully deployed, running on your infrastructure"
  },
  {
    number: "04",
    icon: Key,
    title: "Ownership Handoff",
    duration: "Day 3",
    description: "You receive complete ownership of everything. Code, models, data, documentation—it's all yours. No vendor lock-in, no monthly platform fees, no surprises.",
    details: [
      "Full source code and documentation",
      "Admin credentials and access keys",
      "Training session for your team",
      "Customization guide for future modifications",
      "Architecture documentation for scaling"
    ],
    outcome: "100% ownership transferred to you"
  },
  {
    number: "05",
    icon: HeadphonesIcon,
    title: "Support & Maintenance",
    duration: "Ongoing",
    description: "We don't disappear after deployment. Our team remains available for support, updates, and optimizations. Your success is our success.",
    details: [
      "Priority technical support",
      "Performance monitoring and alerts",
      "Model updates and improvements",
      "Feature additions on request",
      "Scaling assistance as you grow"
    ],
    outcome: "Long-term partnership for continuous improvement"
  }
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
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />
        
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
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold text-black">Deployed in 2-3 Days</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">From Consultation to</span>
              <br />
              <span className="gradient-text">Production in Days</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We build custom AI agents from scratch—not from templates. Here&apos;s our proven process for delivering premium, production-ready agents in 2-3 days.
            </p>
          </motion.div>

          {/* Timeline Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center mb-16"
          >
            <div className="bg-black rounded-2xl px-8 py-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-bold">Typical Timeline:</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2-3</div>
                  <div className="text-xs text-gray-400">Days</div>
                </div>
                <div className="w-px h-8 bg-gray-700" />
                <div className="text-gray-300 text-sm">Based on complexity</div>
              </div>
            </div>
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
                      <div className="px-3 py-1 bg-purple-500/20 rounded-full">
                        <span className="text-xs font-bold text-purple-300">{step.duration}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-10 p-8 sm:p-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">{step.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{step.description}</p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-3 inline-flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">Outcome: {step.outcome}</span>
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
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-3xl p-8 sm:p-12 mb-20 border border-gray-100"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-black mb-2">2-3</div>
                <div className="text-gray-600 font-medium">Days to Deploy</div>
                <div className="text-sm text-gray-500 mt-1">Based on complexity</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-black mb-2">100%</div>
                <div className="text-gray-600 font-medium">Your Ownership</div>
                <div className="text-sm text-gray-500 mt-1">Code, models, data—all yours</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-black mb-2">80-90%</div>
                <div className="text-gray-600 font-medium">Cost Savings</div>
                <div className="text-sm text-gray-500 mt-1">vs. cloud AI platforms</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Book a free consultation and let&apos;s discuss your requirements. In 2-3 days, you could have a custom AI agent running on your infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
