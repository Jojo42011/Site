"use client";

import { motion } from "framer-motion";
import { DollarSign, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Cut AI system spending by 80-90%",
    description: "Why slow your growth by spending massive amounts monthly on your AI agents? Run the same quality models specialized for your client needs for a fraction of the cost and never have runtime issues.",
  },
  {
    icon: Zap,
    title: "Deploy with speed",
    description: "We handle everything: Creating the AI systems tailored for each client, model training, fine-tuning, even deployment. You're up and running with production-ready dedicated AI agents and systems quickly for a fraction of long-term costs.",
  },
  {
    icon: TrendingUp,
    title: "Scaling your AI company",
    description: "Unlike other agentic creators like n8n and make, there is no hidden fees and API credit costs wasting your revenue monthly so you can scale seamlessly. Along with that, we give you complete ownership of your agents and the data collected to maintain compliance and avoid fines.",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black">
            Why AI founders choose <span className="gradient-text">Aethon</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We help AI founders deploy private AI systems and agents for their clients that cost significantly less in monthly API and hosting fees. Same quality, drastically lower costs, and complete data ownership. Your agents, your models, your control.
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
              <div className="bg-white rounded-2xl p-8 h-full border-2 border-gray-200 hover:border-black transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
