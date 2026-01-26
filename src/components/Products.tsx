"use client";

import { motion } from "framer-motion";
import {
  FileCode,
  Handshake,
  Check,
  Zap,
  Clock,
  Infinity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "templates",
    icon: FileCode,
    badge: "Move Fast",
    title: "Template Licenses",
    tagline: "One-time purchase, unlimited deployments",
    price: "$500 - $1,000",
    priceLabel: "per template",
    description:
      "Pre-built automation templates for common use cases. Purchase once, deploy to unlimited clients. Get started same-day with proven automation workflows.",
    features: [
      { icon: Zap, text: "Same-day deployment to clients" },
      { icon: Infinity, text: "Unlimited client deployments" },
      { icon: Clock, text: "30 days setup support included" },
    ],
    includes: [
      "Complete automation workflow",
      "Setup guide & deployment docs",
      "Integration configuration",
      "White-label ready",
    ],
    bestFor: "Agencies wanting to move fast with proven templates",
    cta: "Browse Voice Automations",
    ctaLink: "/pricing",
  },
  {
    id: "partnership",
    icon: Handshake,
    badge: "Full Flexibility",
    title: "Full Partnership",
    tagline: "Revenue share or monthly retainer",
    price: "Custom",
    priceLabel: "based on volume",
    description:
      "We build any custom automation you need. You sell to your clients, we handle all backend tech, integrations, and infrastructure. Unlimited custom builds with full support.",
    features: [
      { icon: Infinity, text: "Unlimited custom automations" },
      { icon: Zap, text: "Custom integrations with any API" },
      { icon: Clock, text: "Full technical support included" },
    ],
    includes: [
      "Any custom automation built",
      "Native integrations (no middleware)",
      "White-label everything",
      "Priority support & updates",
    ],
    bestFor: "Agencies wanting full flexibility and custom solutions",
    cta: "Try Demo",
    ctaLink: "https://renovated-detailing-voice-agent.fly.dev/demo",
  },
];

export default function Products() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-black">Two Ways to</span>{" "}
            <span className="gradient-text">Partner With Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you want ready-made templates or fully custom solutions, we&apos;ve got you covered.
            Choose the model that fits your agency.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl overflow-hidden premium-shadow hover:premium-shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="inline-flex items-center px-2 py-0.5 bg-white/20 rounded-full mb-1">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{product.badge}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm font-medium mb-4">{product.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{product.price}</span>
                    <span className="text-gray-400">{product.priceLabel}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          <feature.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Includes */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Includes:</div>
                    <div className="space-y-2">
                      {product.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-6">
                    <span className="font-medium text-gray-700">Best for:</span> {product.bestFor}
                  </div>

                  {/* CTA Button */}
                  {product.ctaLink.startsWith("http") ? (
                    <a
                      href={product.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all group-hover:scale-[1.02] transform"
                    >
                      {product.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  ) : (
                    <Link
                      href={product.ctaLink}
                      className="w-full inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all group-hover:scale-[1.02] transform"
                    >
                      {product.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-black rounded-3xl p-12 text-center premium-shadow-lg"
        >
          <h3 className="text-3xl font-bold text-white mb-4 text-center">
            Not Sure Which Model Is Right for You?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Book a quick call and we&apos;ll help you figure out the best approach for your agency. No pressure, just clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Schedule a Call
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              View All Voice Automations
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
