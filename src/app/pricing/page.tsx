"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, PhoneOutgoing, CalendarCheck, MessageSquare, HeadphonesIcon } from "lucide-react";

const templates = [
  {
    name: "Outbound Sales Agent",
    icon: PhoneOutgoing,
    price: "$750",
    description: "Cold calling, lead follow-up, and Meta Ads integration. Convert more leads with instant outreach.",
    features: [
      "Meta Ads lead integration",
      "Cold calling campaigns",
      "CRM sync (HubSpot, Salesforce, GHL)",
      "Call recording & analytics",
      "White-label ready",
    ],
  },
  {
    name: "Inbound Booking Agent",
    icon: CalendarCheck,
    price: "$600",
    description: "24/7 appointment scheduling, FAQ handling, and lead qualification.",
    features: [
      "Calendar integration (Google, Outlook)",
      "Lead qualification flows",
      "FAQ handling",
      "SMS confirmations",
      "White-label ready",
    ],
  },
  {
    name: "Sales Follow-Up System",
    icon: MessageSquare,
    price: "$850",
    description: "Automated voice + SMS sequences to nurture warm leads until they convert.",
    features: [
      "Voice + SMS sequences",
      "Warm lead nurturing",
      "Automated reminders",
      "Conversion tracking",
      "White-label ready",
    ],
  },
  {
    name: "Customer Support Agent",
    icon: HeadphonesIcon,
    price: "$500",
    description: "Handle FAQs, route complex issues, and reduce support costs.",
    features: [
      "FAQ automation",
      "Smart routing to humans",
      "Multi-language support",
      "Ticket creation",
      "White-label ready",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-600 text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Templates + Partnership Options
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Voice Agent Templates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            One-time purchase, unlimited deployments. Deploy to your clients same-day.
            All templates run at just <span className="font-semibold text-black">$0.06/minute</span>—60% cheaper than competitors.
          </motion.p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center">
                        <template.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                        <p className="text-gray-500 text-sm">One-time purchase</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-black">{template.price}</div>
                      <div className="text-sm text-gray-500">one-time</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{template.description}</p>

                  <div className="space-y-3 mb-8">
                    {template.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
                  >
                    Get This Template
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Need Something <span className="gradient-text">Custom?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Full partnership gives you unlimited custom automations built to your exact specs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-black via-gray-900 to-black p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Full Partnership</h3>
              <p className="text-purple-200">Revenue share or monthly retainer</p>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-black mb-4">What You Get</h4>
                  <div className="space-y-3">
                    {[
                      "Unlimited custom automations",
                      "Native integrations with any API",
                      "Full white-label (zero Aethon branding)",
                      "Priority technical support",
                      "Custom integrations built for you",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-4">What We Handle</h4>
                  <div className="space-y-3">
                    {[
                      "Infrastructure & hosting",
                      "All technical development",
                      "Integrations & maintenance",
                      "Updates & improvements",
                      "Scaling as you grow",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all"
                >
                  Apply for Partnership
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why We&apos;re <span className="gradient-text">60% Cheaper</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We build from scratch instead of reselling. You keep the savings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 sm:p-12"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-2">Retell / Vapi</div>
                <div className="text-3xl font-bold text-red-400">$0.15-0.20</div>
                <div className="text-gray-500 text-sm mt-1">per minute</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm font-medium mb-2">Aethon</div>
                <div className="text-3xl font-bold text-green-400">$0.06</div>
                <div className="text-gray-500 text-sm mt-1">per minute</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm font-medium mb-2">Your Savings</div>
                <div className="text-3xl font-bold text-white">60%+</div>
                <div className="text-gray-500 text-sm mt-1">more profit</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 sm:p-12 text-center border border-purple-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Selling Voice Agents?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get a template today or apply for partnership. Either way, you&apos;ll be selling within days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-black rounded-xl font-semibold text-lg text-white hover:bg-gray-800 transition-all"
              >
                Become a Partner
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold text-lg text-gray-900 hover:border-purple-300 hover:bg-purple-50 transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
