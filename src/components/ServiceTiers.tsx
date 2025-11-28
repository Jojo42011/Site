"use client";

import { motion } from "framer-motion";
import { Search, Zap, Building2, Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    icon: Search,
    badge: "🎯",
    title: "DIY Starter",
    subtitle: "For technical teams who want to self-deploy",
    price: "$2,500",
    priceDetail: "one-time",
    features: [
      "Complete deployment playbook & scripts",
      "Hardware recommendations for your scale",
      "Model selection guide (Llama, Mixtral, DeepSeek)",
      "Ollama + ChromaDB setup templates",
      "Drop-in API replacement configuration",
      "Migration guides from cloud providers",
      "Community Slack access",
    ],
    timeline: "Start immediately",
    deliverable: "Self-service setup kit + community support",
    bestFor: "Technical founders who want to DIY and save the most money",
    cta: "Get Started",
    href: "/contact",
    gradient: "from-purple-glow to-purple-dark",
    monthlyCost: "$200-500/mo",
  },
  {
    icon: Zap,
    badge: "⚡",
    title: "Done-For-You",
    subtitle: "We deploy everything for you",
    price: "$7,500",
    priceDetail: "one-time setup",
    features: [
      "Everything in DIY Starter, PLUS:",
      "Full deployment on your infrastructure",
      "Hardware procurement assistance",
      "Custom model fine-tuning (1 use case)",
      "Team training (2 sessions)",
      "API migration support",
      "2 weeks white-glove setup",
      "90-day priority support",
    ],
    timeline: "2-4 weeks to production",
    deliverable: "Production-ready system + full documentation",
    bestFor: "SaaS founders who want to cut costs without the technical headache",
    cta: "Book Free Audit",
    href: "/contact",
    gradient: "from-blue-electric to-purple-glow",
    popular: true,
    monthlyCost: "$300-800/mo",
  },
  {
    icon: Building2,
    badge: "🚀",
    title: "Enterprise",
    subtitle: "For high-volume operations",
    price: "Custom",
    priceDetail: "contact us",
    features: [
      "Multi-region deployment",
      "Multiple fine-tuned models",
      "High-availability architecture",
      "Dedicated infrastructure engineer",
      "24/7 monitoring & support",
      "SLA guarantees",
      "Compliance documentation (SOC 2, HIPAA)",
      "Quarterly optimization reviews",
      "Priority feature development",
    ],
    timeline: "4-8 weeks to production",
    deliverable: "Enterprise-grade private AI infrastructure",
    bestFor: "Companies processing 100M+ tokens/month or needing SLA guarantees",
    cta: "Contact Sales",
    href: "/contact",
    gradient: "from-purple-glow to-blue-electric",
    monthlyCost: "$2K-5K/mo",
  },
];

export default function ServiceTiers() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Simple Pricing</span>{" "}
            <span className="text-white">No Surprises</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Choose your setup path. All options include the same massive cost savings vs cloud APIs.
          </p>
        </motion.div>

        <div className="space-y-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative glass-effect rounded-2xl p-6 sm:p-8 lg:p-10 ${
                tier.popular ? "border-purple-glow/50 ring-2 ring-purple-glow/30" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-6 px-4 py-1 bg-gradient-to-r from-purple-glow to-blue-electric rounded-full text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Title & Features */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                      <tier.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-2xl mr-2">{tier.badge}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{tier.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-lg">{tier.subtitle}</p>

                  <h4 className="text-white font-semibold mb-4">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-purple-glow flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Details & CTA */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-4 mb-6">
                    <div className="glass-effect rounded-xl p-6 border-2 border-purple-glow/30 bg-gradient-to-br from-purple-glow/5 to-blue-electric/5">
                      <span className="text-gray-400 text-sm">Setup Cost</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-bold text-white">{tier.price}</span>
                        <span className="text-gray-400 text-sm">{tier.priceDetail}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <span className="text-gray-400 text-sm">Monthly Operating Cost</span>
                        <p className="text-green-400 font-bold text-lg">{tier.monthlyCost}</p>
                        <p className="text-xs text-gray-500 mt-1">vs $10K-50K+ on cloud APIs</p>
                      </div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <span className="text-gray-400 text-sm">Timeline</span>
                      <p className="text-white font-medium">{tier.timeline}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <span className="text-gray-400 text-sm">Best for</span>
                      <p className="text-white font-medium">{tier.bestFor}</p>
                    </div>
                  </div>

                  <Link
                    href={tier.href}
                    className={`w-full py-4 rounded-xl font-semibold text-center transition-all block ${
                      tier.popular
                        ? "bg-gradient-to-r from-purple-glow to-blue-electric text-white hover:scale-105 glow-purple"
                        : "border border-purple-glow/30 text-white hover:border-purple-glow/60 hover:bg-purple-glow/10"
                    }`}
                  >
                    {tier.cta}
                  </Link>
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass-effect rounded-2xl p-8 sm:p-12 text-center"
        >
          <div className="text-3xl mb-4">💰</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Not sure where to start?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Book a free 15-minute savings audit. We&apos;ll analyze your current API usage and show you exactly how much you could save.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform glow-purple"
            >
              Get Free Savings Audit
            </Link>
            <a
              href="#calculator"
              className="w-full sm:w-auto px-8 py-4 border border-purple-glow/30 rounded-xl font-semibold text-white hover:border-purple-glow/60 hover:bg-purple-glow/10 transition-all"
            >
              Calculate Savings Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
