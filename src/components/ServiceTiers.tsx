"use client";

import { motion } from "framer-motion";
import { Search, Zap, Building2, Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    icon: Search,
    badge: "🔍",
    title: "AI Privacy Assessment",
    subtitle: "Understand your organization's AI data exposure risks",
    features: [
      "Complete AI usage audit across your organization",
      "Data flow mapping & vulnerability identification",
      "Compliance gap analysis (HIPAA, SOC 2, GDPR, etc.)",
      "Prioritized risk mitigation roadmap",
      "Working demo: Pre-configured local LLM",
      "AI usage policy templates customized for your industry",
    ],
    timeline: "5-14 days depending on organization size",
    deliverable: "Comprehensive report + demo environment",
    bestFor: "Organizations evaluating AI adoption or concerned about current AI tool usage",
    cta: "Schedule Consultation",
    href: "/contact",
    gradient: "from-purple-glow to-purple-dark",
  },
  {
    icon: Zap,
    badge: "⚡",
    title: "Proof of Concept Deployment",
    subtitle: "Validate air-gapped AI in your environment with real data",
    features: [
      "Everything in Assessment, PLUS:",
      "Local LLM deployed on your infrastructure",
      "Trained on your actual data (one use case)",
      "Air-gapped configuration (zero external connections)",
      "Performance benchmarking vs. cloud alternatives",
      "Security validation & penetration testing",
      "IT team training & documentation",
      "90-day technical support",
    ],
    timeline: "4-8 weeks depending on complexity",
    deliverable: "Working production-ready system + full documentation",
    bestFor: "Organizations ready to prove ROI before full-scale implementation",
    cta: "Schedule Consultation",
    href: "/contact",
    gradient: "from-blue-electric to-purple-glow",
    popular: true,
  },
  {
    icon: Building2,
    badge: "🏢",
    title: "Production Deployment",
    subtitle: "Complete private AI infrastructure for your institution",
    features: [
      "Multi-use case AI implementation",
      "Enterprise-grade air-gapped infrastructure",
      "Multiple LLM models optimized for different tasks",
      "Custom model training on your complete datasets",
      "High-availability architecture with failover",
      "Security monitoring & incident response",
      "Ongoing model optimization & updates",
      "24/7 support & maintenance (Year 1 included)",
      "Compliance documentation & audit support",
    ],
    timeline: "12-24 weeks depending on scope",
    deliverable: "Turnkey private AI infrastructure",
    bestFor: "Institutions ready to scale private AI across departments",
    cta: "Schedule Consultation",
    href: "/contact",
    gradient: "from-purple-glow to-blue-electric",
  },
];

export default function ServiceTiers() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Our</span>{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Every organization has unique needs. We offer customized solutions tailored to your specific security requirements, infrastructure, and goals.
          </p>
        </motion.div>

        <div className="space-y-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative glass-effect rounded-2xl p-6 sm:p-8 lg:p-10 ${
                tier.popular ? "border-purple-glow/50 ring-2 ring-purple-glow/30" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-6 px-4 py-1 bg-gradient-to-r from-purple-glow to-blue-electric rounded-full text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Title & Features */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                      <tier.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-2xl mr-2">{tier.badge}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{tier.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-lg">{tier.subtitle}</p>

                  <h4 className="text-white font-semibold mb-4">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-purple-glow flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Details & CTA */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-4 mb-6">
                    <div className="glass-effect rounded-xl p-4">
                      <span className="text-gray-400 text-sm">Timeline</span>
                      <p className="text-white font-medium">{tier.timeline}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <span className="text-gray-400 text-sm">Deliverable</span>
                      <p className="text-white font-medium">{tier.deliverable}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <span className="text-gray-400 text-sm">Best for</span>
                      <p className="text-white font-medium">{tier.bestFor}</p>
                    </div>
                  </div>

                  <Link
                    href={tier.href}
                    className={`w-full py-4 rounded-xl font-semibold text-center transition-all block ${
                      tier.popular
                        ? "bg-gradient-to-r from-purple-glow to-blue-electric text-white hover:scale-105 glow-purple"
                        : "border border-purple-glow/30 text-white hover:border-purple-glow/60 hover:bg-purple-glow/10"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass-effect rounded-2xl p-8 sm:p-12 text-center"
        >
          <div className="text-3xl mb-4">💡</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Not sure where to start?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Take our free 5-minute AI Privacy Risk Assessment to understand your current exposure and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/risk-assessment"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform glow-purple"
            >
              Start Free Assessment →
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 border border-purple-glow/30 rounded-xl font-semibold text-white hover:border-purple-glow/60 hover:bg-purple-glow/10 transition-all"
            >
              Book Free Consultation →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
