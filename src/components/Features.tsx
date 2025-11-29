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
    description: "We handle everything. Creating the AI systems tailored for each client, model training, fine-tuning, even deployment. You're up and running with production-ready dedicated AI agents and systems quickly for a fraction of long-term costs.",
  },
  {
    icon: TrendingUp,
    title: "Scaling your AI company",
    description: "Unlike other agentic creators like n8n and make, there is no hidden fees and API credit costs wasting your revenue monthly so you can scale seamlessly. Along with that, we give you complete ownership of your agents and the data collected to maintain compliance and avoid fines.",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-black leading-tight">
            Why AI founders choose <span className="gradient-text">Aethon</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Deploy private AI systems and agents for your clients that cost significantly less in monthly API and hosting fees. 
            <span className="font-semibold text-black"> Same quality, drastically lower costs,</span> complete data ownership.
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
              <div className="bg-white rounded-3xl p-10 h-full premium-border-hover premium-shadow hover:premium-shadow-lg transition-all duration-300 flex flex-col">
                <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-black mb-6 leading-tight">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
