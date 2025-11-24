"use client";

import { motion } from "framer-motion";
import { Network, Lock, Brain } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Air-Gapped Architecture",
    description: "Complete network isolation ensures your data never leaves your infrastructure. Every component operates within your secure environment with zero external dependencies. Your AI systems run entirely on-premises, completely disconnected from public networks, giving you absolute control over your data sovereignty and eliminating any risk of data leakage or unauthorized access.",
    gradient: "from-purple-glow to-purple-dark",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade encryption protects your data at rest and in transit. Every AI conversation, every database query, and every model interaction is secured with advanced cryptographic protocols. Your sensitive information remains completely private, with encryption keys managed entirely within your infrastructure. No third party ever has access to your encrypted data.",
    gradient: "from-blue-electric to-blue-navy",
  },
  {
    icon: Brain,
    title: "Custom Trained Private Models",
    description: "We build and train private LLMs specifically for your institution using your own data, all within your air-gapped environment. These models are fine-tuned to understand your unique workflows, terminology, and requirements. With zero data leaks, your proprietary information stays within your walls. Each model is trained exclusively on your infrastructure, ensuring complete privacy and compliance with the strictest security standards.",
    gradient: "from-purple-glow to-blue-electric",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">What is</span>{" "}
            <span className="gradient-text">Aethon?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aethon is founded on one principle: privacy. We use private tools to create private LLMs and databases that are uniquely tailored for each institution. Every system we build operates entirely within your secure environment, ensuring your data never leaves your infrastructure. No compromises, no exceptions—just complete data sovereignty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-effect rounded-2xl p-8 h-full hover:border-purple-glow/60 transition-all duration-300 flex flex-col">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed text-base flex-grow">{feature.description}</p>
              </div>
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

