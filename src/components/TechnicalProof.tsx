"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Database, Gauge } from "lucide-react";

const technicalDetails = [
  {
    icon: Server,
    title: "Models Available",
    items: [
      "Llama 3.1 70B (GPT-4 quality)",
      "DeepSeek V2 (Best cost/performance)",
      "Mixtral 8x22B (Production ready)",
      "Custom fine-tuned models",
    ],
  },
  {
    icon: Cpu,
    title: "Infrastructure",
    items: [
      "Runs on Ollama + LiteLLM",
      "$500/mo server = 1M requests/day",
      "Your hardware or cloud (AWS/GCP)",
      "Air-gapped or VPN-secured",
    ],
  },
  {
    icon: Database,
    title: "Tech Stack",
    items: [
      "ChromaDB for vector storage",
      "Full RAG capabilities",
      "OpenAI-compatible API",
      "Easy migration from existing apps",
    ],
  },
  {
    icon: Gauge,
    title: "Performance",
    items: [
      "~2-5s average response time",
      "99.9% uptime with HA setup",
      "Unlimited scaling (add servers)",
      "No rate limits or throttling",
    ],
  },
];

export default function TechnicalProof() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Technical</span>{" "}
            <span className="text-black">Details</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Production-grade infrastructure built on proven open-source tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicalDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-black transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4">
                <detail.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black font-bold text-lg mb-4">{detail.title}</h3>
              <ul className="space-y-2">
                {detail.items.map((item, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-gray-50 rounded-xl p-8 text-center border-2 border-gray-200"
        >
          <h3 className="text-black font-bold text-xl mb-4">
            Migration Made Simple
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our setup is OpenAI API-compatible. Just change your API endpoint - no code rewrites needed.
            We handle hardware selection, model deployment, fine-tuning, and training your team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2" />
              <span>2-4 week deployment</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2" />
              <span>Full documentation</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-black rounded-full mr-2" />
              <span>Team training included</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
