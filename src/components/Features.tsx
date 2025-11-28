"use client";

import { motion } from "framer-motion";
import { DollarSign, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Slash API Costs by 80-90%",
    description: "Stop hemorrhaging money on cloud AI APIs. Run the same quality models on your own infrastructure for a fraction of the cost. What used to cost $50K/month now costs $5K. That's $540K saved annually - money that goes straight to your runway. Break even in 1-2 months, then pure savings every month after.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Zap,
    title: "Deploy in Weeks, Not Months",
    description: "We handle everything: hardware recommendations, model selection, fine-tuning, deployment, and training your team. You're up and running with production-ready private LLMs in 2-4 weeks. No PhD required, no months of trial and error. Just a working system that cuts your costs immediately while giving you full control over your AI infrastructure.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Your Data Stays Yours",
    description: "Run everything on your own servers - no data sent to third-party cloud providers. Perfect for SaaS companies handling sensitive customer data, legal firms with privileged information, or any business serious about data privacy. Air-gapped infrastructure means zero data leaks, complete compliance, and you own the IP on your fine-tuned models.",
    gradient: "from-purple-600 to-indigo-600",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Why SaaS Founders</span>{" "}
            <span className="gradient-text">Choose Aethon</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We help SaaS companies and legal firms deploy private LLMs and AI agents that cost 80-90% less than cloud APIs.
            Same quality, drastically lower costs, and complete data privacy. Your servers, your models, your control.
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
              <div className="bg-white rounded-2xl p-8 h-full border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
