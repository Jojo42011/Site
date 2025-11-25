"use client";

import { motion } from "framer-motion";
import { User, Code, Shield, ListChecks } from "lucide-react";

const trustCards = [
  {
    icon: User,
    title: "Built by Security Experts",
    content: "Our team brings deep expertise in enterprise security, AI infrastructure, and data privacy. We understand the unique challenges organizations face when balancing innovation with compliance.",
    gradient: "from-purple-glow to-purple-dark",
  },
  {
    icon: Code,
    title: "Open Source, Transparent Technology",
    content: "Built on proven open-source models (Llama 3, Mistral) with custom security hardening.",
    bullets: [
      "No proprietary black-box models",
      "Full infrastructure transparency",
      "Auditable codebase",
      "Regular security updates",
    ],
    gradient: "from-blue-electric to-purple-glow",
  },
  {
    icon: Shield,
    title: "Security Certifications",
    content: "Our commitment to enterprise-grade security",
    certifications: [
      { name: "SOC 2 Type II", status: "In Progress", target: "Q2 2025", progress: 60 },
      { name: "ISO 27001", status: "Roadmap Planned", target: "2025", progress: 20 },
      { name: "HIPAA Compliance", status: "Framework Implemented", target: "", progress: 80 },
      { name: "GDPR Ready", status: "Built-in data sovereignty", target: "", progress: 100 },
    ],
    gradient: "from-purple-glow to-blue-electric",
  },
  {
    icon: ListChecks,
    title: "Our 5-Step Security-First Process",
    steps: [
      "Security Assessment & Planning",
      "Infrastructure Hardening",
      "Air-Gapped Deployment",
      "Model Training & Testing",
      "Ongoing Monitoring & Support",
    ],
    gradient: "from-blue-electric to-blue-navy",
  },
];

export default function TrustCredibility() {
  return (
    <section className="relative py-24 bg-charcoal-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Why Organizations</span>{" "}
            <span className="gradient-text">Trust Aethon</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Enterprise-grade security backed by transparency, expertise, and proven processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {trustCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 sm:p-8"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{card.title}</h3>
              
              {card.content && (
                <p className="text-gray-300 mb-4">{card.content}</p>
              )}

              {card.bullets && (
                <ul className="space-y-2">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center space-x-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-glow rounded-full" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {card.certifications && (
                <div className="space-y-4">
                  {card.certifications.map((cert) => (
                    <div key={cert.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{cert.name}</span>
                        <span className="text-gray-400 text-xs">{cert.status}</span>
                      </div>
                      <div className="w-full h-2 bg-charcoal-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-glow to-blue-electric rounded-full transition-all"
                          style={{ width: `${cert.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {card.steps && (
                <ol className="space-y-3">
                  {card.steps.map((step, stepIndex) => (
                    <li key={step} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-glow to-blue-electric flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {stepIndex + 1}
                      </div>
                      <span className="text-gray-300 text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

