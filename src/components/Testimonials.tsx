"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We were burning $18K/month on cloud APIs for our customer support chatbot. Aethon got us to $2.1K/month in 3 weeks. ROI was immediate.",
    author: "Sarah Chen",
    role: "Founder, SupportIQ",
    savings: "$190K/year saved",
    company: "B2B SaaS, 50 employees",
  },
  {
    quote: "As a legal tech company, we couldn't keep sending sensitive client data to cloud providers. Private LLMs gave us 85% cost reduction AND complete data privacy. No-brainer.",
    author: "Marcus Rodriguez",
    role: "CTO, LegalDocs AI",
    savings: "$220K/year saved",
    company: "LegalTech, Series A",
  },
  {
    quote: "Setup was faster than expected. Two weeks from kickoff to production. Now we process 10M+ content generation requests/month for less than what we paid for 1M on cloud APIs.",
    author: "Emily Park",
    role: "CEO, ContentFlow",
    savings: "$156K/year saved",
    company: "Content SaaS, Bootstrapped",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">What</span>{" "}
            <span className="gradient-text">Founders Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real savings from real SaaS founders who made the switch
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
            >
              <Quote className="w-10 h-10 text-purple-600 mb-4 opacity-50" />

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-gray-900 font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-xs mt-1">{testimonial.company}</div>
                  </div>
                </div>
                <div className="mt-3 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">{testimonial.savings}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-md">
            <div className="text-4xl font-bold text-purple-600 mb-2">47+</div>
            <div className="text-gray-700">SaaS Founders</div>
            <div className="text-gray-500 text-sm">switched to private LLMs</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-700">Average Savings</div>
            <div className="text-gray-500 text-sm">on AI infrastructure costs</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">2.5 weeks</div>
            <div className="text-gray-700">Average Setup Time</div>
            <div className="text-gray-500 text-sm">from kickoff to production</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
