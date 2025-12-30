"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is this different from Retell or Vapi?",
    answer: "Retell and Vapi charge $0.15-0.20 per minute plus platform fees. Our voice agents cost just $0.06 per minute—60% cheaper. Plus, we build custom integrations directly into any system without needing Zapier or n8n middleware. You get full white-label control and keep the relationship with your clients."
  },
  {
    question: "Do I need developers on my team?",
    answer: "No. We handle all technical work—building the automation, setting up integrations, deploying to production, and ongoing maintenance. You focus on sales and client relationships. We're your technical backend."
  },
  {
    question: "How long does it take to deploy for a client?",
    answer: "Templates can be deployed same-day. Custom automations typically take 3-7 days depending on complexity and integration requirements. We move fast because speed to lead matters for your clients."
  },
  {
    question: "Can I white-label completely?",
    answer: "Yes, 100%. Zero Aethon branding is visible to your end clients. It's your product, your brand, your relationship. We're invisible infrastructure."
  },
  {
    question: "What if my client needs a custom integration?",
    answer: "We build it natively. Because we build from scratch, we can integrate directly with any API—calendars (Google, Outlook), CRMs (HubSpot, Salesforce, Go High Level), payment systems (Stripe), scheduling tools, or custom proprietary systems. No middleware limitations."
  },
  {
    question: "What's the difference between Templates and Partnership?",
    answer: "Templates are one-time purchases ($500-1,000) for specific automation types you can deploy unlimited times. Partnership is a revenue share or retainer model where we build any custom automation you need with full support. Templates for speed, partnership for flexibility."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-black leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about partnering with Aethon.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-2xl p-6 text-left premium-shadow hover:premium-shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-black pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
