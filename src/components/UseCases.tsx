"use client";

import { motion } from "framer-motion";
import { Building2, Heart, DollarSign, Scale, GraduationCap, Briefcase } from "lucide-react";

const useCases = [
  {
    icon: Building2,
    title: "Government & Defense",
    description: "Classified intelligence analysis, secure document processing, and confidential communications.",
    color: "from-blue-electric to-blue-navy",
  },
  {
    icon: Heart,
    title: "Healthcare Systems",
    description: "HIPAA-compliant patient data analysis, medical research, and clinical decision support.",
    color: "from-purple-glow to-purple-dark",
  },
  {
    icon: DollarSign,
    title: "Financial Institutions",
    description: "Secure fraud detection, risk analysis, and regulatory compliance without data exposure.",
    color: "from-blue-electric to-purple-glow",
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    description: "Confidential case analysis, contract review, and privileged document processing.",
    color: "from-purple-dark to-blue-navy",
  },
  {
    icon: GraduationCap,
    title: "Research Institutions",
    description: "Private research data analysis, academic collaboration, and intellectual property protection.",
    color: "from-purple-glow to-blue-electric",
  },
  {
    icon: Briefcase,
    title: "Enterprise Security",
    description: "Internal knowledge bases, secure customer support, and confidential business intelligence.",
    color: "from-blue-navy to-purple-glow",
  },
];

export default function UseCases() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-transparent to-charcoal-950/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Trusted by</span>{" "}
            <span className="text-white">Critical Industries</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            When data privacy is non-negotiable, institutions choose Aethon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-effect rounded-xl p-6 h-full hover:border-purple-glow/60 transition-all duration-300 hover:scale-105">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

