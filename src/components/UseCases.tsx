"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Code, BarChart3, Mail, Search } from "lucide-react";

const useCases = [
  {
    icon: MessageSquare,
    title: "Customer Support Chatbots",
    description: "80% ticket deflection at $0.10 per 1,000 messages. Handle customer queries 24/7 without burning through API credits.",
    savings: "$15K/mo saved",
    color: "from-purple-glow to-purple-dark",
  },
  {
    icon: FileText,
    title: "Content Generation",
    description: "Blog posts, marketing copy, product descriptions, and social media content. Same quality as GPT-4, 90% less cost.",
    savings: "$8K/mo saved",
    color: "from-blue-electric to-blue-navy",
  },
  {
    icon: Code,
    title: "Code Assistance",
    description: "GitHub Copilot replacement that runs on your infrastructure. Code generation, review, and documentation at a fraction of the cost.",
    savings: "$12K/mo saved",
    color: "from-blue-electric to-purple-glow",
  },
  {
    icon: BarChart3,
    title: "Data Analysis & Insights",
    description: "Analyze customer data, generate reports, and surface insights without exposing sensitive information to third-party APIs.",
    savings: "$10K/mo saved",
    color: "from-purple-dark to-blue-navy",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Personalized outreach, follow-ups, and customer communications. Scale your email operations without scaling your API bill.",
    savings: "$6K/mo saved",
    color: "from-purple-glow to-blue-electric",
  },
  {
    icon: Search,
    title: "Document Search & RAG",
    description: "Private knowledge base with ChromaDB. Search contracts, documents, and internal wikis with complete data privacy.",
    savings: "$9K/mo saved",
    color: "from-blue-navy to-purple-glow",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-32 bg-gradient-to-b from-transparent to-charcoal-950/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Common</span>{" "}
            <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Replace expensive cloud APIs with private LLMs for these high-volume workloads
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
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold">
                    {useCase.savings}
                  </span>
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

