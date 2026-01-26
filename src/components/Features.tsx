"use client";

import { motion } from "framer-motion";
import { DollarSign, Plug, Tag, TrendingUp } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Proven to Sell",
    description: "Build custom automations that sell. Start with proven templates or create your own. Configure everything on the dashboard—easy, affordable, everything in one place.",
    highlight: "Validated",
  },
  {
    icon: Plug,
    title: "Built-in Integrations",
    description: "Calendar, CRM, and Twilio—all in one dashboard. No Zapier, no n8n, no middleware. Configure once, deploy in minutes. Built for agency owners who want to move fast.",
    highlight: "No middleware",
  },
  {
    icon: Tag,
    title: "Fully White-Labeled",
    description: "Your brand throughout. Zero Aethon branding visible to end clients. Your agency's product, your relationship, your recurring revenue.",
    highlight: "Your brand",
  },
  {
    icon: DollarSign,
    title: "Deploy in Minutes",
    description: "Build your automation on the dashboard, configure it however you want, and deploy same-day. No weeks of setup, no complex development. Easy, affordable, everything in one place.",
    highlight: "Same-day",
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
            Built for <span className="gradient-text">Agency Owners</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Build or create custom automations that sell. Configure however you want on the dashboard. Deploy in minutes, start selling today.
            <span className="font-semibold text-black"> No Zapier, no n8n—everything in one place.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl p-8 h-full premium-border-hover premium-shadow hover:premium-shadow-lg transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-semibold mb-4 w-fit">
                  {feature.highlight}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 leading-tight">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value proposition callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 sm:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Custom Automations</div>
              <div className="text-3xl font-bold text-green-400">Easy</div>
              <div className="text-gray-500 text-sm mt-1">to configure on dashboard</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Deployment Time</div>
              <div className="text-3xl font-bold text-white">Minutes</div>
              <div className="text-gray-500 text-sm mt-1">not weeks</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium mb-2">Integrations</div>
              <div className="text-3xl font-bold text-green-400">Built-in</div>
              <div className="text-gray-500 text-sm mt-1">no middleware needed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
