"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceTiers from "@/components/ServiceTiers";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Tailored Solutions for</span>{" "}
            <span className="gradient-text">Your Organization</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Every organization has unique security requirements, infrastructure, and goals. 
            We provide customized consulting and implementation—not one-size-fits-all packages.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-gray-300"
          >
            <span className="w-2 h-2 bg-purple-glow rounded-full mr-3 animate-pulse" />
            Schedule a consultation to discuss your specific needs and receive a custom proposal
          </motion.div>
        </div>
      </section>

      {/* Service Tiers */}
      <ServiceTiers />

      {/* Why Custom Section */}
      <section className="relative py-24 bg-charcoal-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why We Don&apos;t List Prices
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Private AI infrastructure isn&apos;t a product—it&apos;s a partnership. Here&apos;s what affects your investment:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Organization Size",
                description: "A 50-person law firm has different needs than a 5,000-person hospital system.",
              },
              {
                title: "Data Complexity",
                description: "The volume, sensitivity, and structure of your data affects implementation scope.",
              },
              {
                title: "Compliance Requirements",
                description: "HIPAA, SOC 2, GDPR, ITAR—each adds specific security and documentation needs.",
              },
              {
                title: "Existing Infrastructure",
                description: "Your current tech stack determines integration complexity and hardware requirements.",
              },
              {
                title: "Use Cases",
                description: "Document analysis, customer service, research—each requires different model configurations.",
              },
              {
                title: "Support Needs",
                description: "Some teams need hands-on training; others just need documentation and go-live support.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to discuss your needs?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a free 30-minute consultation. We&apos;ll assess your situation and provide a custom proposal—no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-lg text-white hover:scale-105 transition-transform glow-purple"
              >
                Schedule Free Consultation
              </Link>
              <Link
                href="/risk-assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-purple-glow/30 rounded-xl font-semibold text-lg text-white hover:border-purple-glow/60 hover:bg-purple-glow/10 transition-all"
              >
                Take Risk Assessment First
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
