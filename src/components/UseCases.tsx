"use client";

import { motion } from "framer-motion";
import { PhoneOutgoing, HeadphonesIcon, Shield } from "lucide-react";

const useCases = [
  {
    icon: HeadphonesIcon,
    title: "Voice Receptionist",
    description: "24/7 AI receptionist for calls. Answers, routes, schedules, and qualifies leads. Never miss a call.",
    features: ["24/7 call answering", "Appointment scheduling", "Calendar integration", "Lead qualification & FAQ handling"],
  },
  {
    icon: Shield,
    title: "Spam Filter",
    description: "Screen and block spam, robocalls, and unwanted callers before they reach your team.",
    features: ["Spam & robocall detection", "Custom allow/block lists", "Call screening & routing", "Analytics on blocked calls"],
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound Sales Agent",
    description: "Cold calling, lead follow-up, and Meta Ads integration. Convert more leads with instant outreach.",
    features: ["Meta Ads lead integration", "Cold calling campaigns", "CRM sync", "Call recording & analytics"],
  },
];

export default function UseCases() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50/50 to-white">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black leading-tight">
            Agencies Use Our Infrastructure to Build
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revenue-generating automations that help your clients sell more. Not just support bots—real sales tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 h-full premium-shadow hover:premium-shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <useCase.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-3">{useCase.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
