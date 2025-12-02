"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  DollarSign,
  Clock,
  Zap,
  TrendingUp,
  Building2,
  Users,
  Phone,
  Database,
  Shield,
  Quote
} from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    id: "ai-agency",
    icon: Building2,
    industry: "AI Agency",
    title: "Conversational Systems Cut Client Costs by 85%",
    subtitle: "How an AI agency transformed their service offering with custom systems",
    challenge: "An AI agency was stitching together voice tools to serve clients. Each deployment cost $2,000-4,000/month in API fees, eroding margins and limiting customization.",
    solution: "We built a white-label conversational system running on local LLMs. The agency now deploys unlimited instances with a single infrastructure cost, tailoring every workflow per client.",
    results: [
      {
        metric: "$156K",
        label: "Annual Savings",
        detail: "Per high-volume client"
      },
      {
        metric: "2 Days",
        label: "Deployment Time",
        detail: "From spec to production"
      },
      {
        metric: "85%",
        label: "Cost Reduction",
        detail: "vs. previous platform"
      }
    ],
    features: [
      "White-label dashboard for client management",
      "Custom voice training per client",
      "CRM integrations (Salesforce, HubSpot)",
      "Real-time analytics and call recording",
      "Multi-tenant architecture"
    ],
    testimonial: {
      quote: "We went from paying Vapi $4K/month per client to a flat infrastructure cost. Our margins went from 15% to over 60%.",
      author: "Agency Founder",
      role: "AI Voice Solutions"
    }
  },
  {
    id: "saas-founder",
    icon: Users,
    industry: "SaaS Founder",
    title: "SaaS Startup Adds AI Features Without API Costs",
    subtitle: "How a growing SaaS added a knowledge operating system at scale",
    challenge: "A B2B SaaS startup needed document intelligence, but cloud RAG APIs would cost $8K-12K/month at projected volume—killing the feature's viability.",
    solution: "We built a custom knowledge system running entirely on their infrastructure. Users search across uploads, receive cited answers, and the SaaS pays zero per-query fees.",
    results: [
      {
        metric: "$96K",
        label: "Annual Savings",
        detail: "vs. cloud RAG pricing"
      },
      {
        metric: "0",
        label: "Per-Query Cost",
        detail: "Unlimited searches"
      },
      {
        metric: "100%",
        label: "Data Privacy",
        detail: "Documents stay on-prem"
      }
    ],
    features: [
      "Semantic search across all document types",
      "Multi-tenant with customer data isolation",
      "API endpoints for frontend integration",
      "Citation tracking for compliance",
      "Horizontal scaling as users grow"
    ],
    testimonial: {
      quote: "The AI document search became our most-requested feature. If we'd used cloud APIs, we'd be bleeding money. Instead, it's pure margin.",
      author: "SaaS Founder",
      role: "B2B Document Platform"
    }
  },
  {
    id: "enterprise",
    icon: Shield,
    industry: "Enterprise",
    title: "Healthcare Company Deploys Air-Gapped AI",
    subtitle: "HIPAA-compliant AI systems without cloud dependencies",
    challenge: "A healthcare services company needed conversational triage but couldn't use cloud platforms due to HIPAA requirements. Patient data absolutely could not leave their environment.",
    solution: "We deployed a complete AI voice system in their air-gapped environment. Custom-trained on medical terminology, integrated with their EHR system, with full audit logging for compliance.",
    results: [
      {
        metric: "100%",
        label: "Data Compliance",
        detail: "HIPAA-verified deployment"
      },
      {
        metric: "3 Days",
        label: "Full Deployment",
        detail: "Including compliance review"
      },
      {
        metric: "$180K",
        label: "Annual Savings",
        detail: "vs. compliant alternatives"
      }
    ],
    features: [
      "Air-gapped deployment (no internet required)",
      "EHR system integration",
      "Medical terminology training",
      "Complete audit logging",
      "On-site model updates"
    ],
    testimonial: {
      quote: "Other vendors said air-gapped AI would take months and cost six figures. Aethon delivered in 3 days with full HIPAA compliance.",
      author: "CTO",
      role: "Healthcare Services Company"
    }
  }
];

const aggregateStats = [
  { value: "$432K+", label: "Total Client Savings", subtext: "Across all case studies" },
  { value: "2-3", label: "Days Average Deploy", subtext: "From spec to production" },
  { value: "85%", label: "Average Cost Reduction", subtext: "vs. cloud platforms" },
  { value: "100%", label: "Data Ownership", subtext: "Clients own everything" }
];

export default function CaseStudiesPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Premium luxurious purple background designs */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">Success Stories from</span>
              <br />
              <span className="gradient-text">Custom AI Deployments</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real examples of how agencies, SaaS founders, and enterprises have saved hundreds of thousands by switching to custom AI systems.
            </p>
          </motion.div>

          {/* Aggregate Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {aggregateStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 premium-shadow border border-gray-100 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-black mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subtext}</div>
              </div>
            ))}
          </motion.div>

          {/* Case Studies */}
          <div className="space-y-12 mb-20">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-3xl premium-shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-gray-900 to-black p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                        <study.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="px-3 py-1 bg-purple-500/20 rounded-full inline-block mb-1">
                          <span className="text-xs font-bold text-purple-300">{study.industry}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">{study.title}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg">{study.subtitle}</p>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10">
                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">!</span>
                        </div>
                        <h4 className="font-bold text-red-900">The Challenge</h4>
                      </div>
                      <p className="text-red-800/80 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-bold text-green-900">Our Solution</h4>
                      </div>
                      <p className="text-green-800/80 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-10">
                    <h4 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Results
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {study.results.map((result, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
                          <div className="text-3xl font-bold text-black mb-1">{result.metric}</div>
                          <div className="text-sm font-semibold text-gray-700">{result.label}</div>
                          <div className="text-xs text-gray-500">{result.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features Delivered */}
                  <div className="mb-10">
                    <h4 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      What We Built
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {study.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-100">
                    <Quote className="w-8 h-8 text-purple-300 mb-4" />
                    <p className="text-lg text-gray-800 italic mb-4 leading-relaxed">
                      &ldquo;{study.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{study.testimonial.author[0]}</span>
                      </div>
                      <div>
                        <div className="font-bold text-black text-sm">{study.testimonial.author}</div>
                        <div className="text-gray-500 text-xs">{study.testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Your Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-3xl p-8 sm:p-12 border border-gray-100 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">Your Success Story Starts Here</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Every case study started with a conversation. Whether you&apos;re an agency, SaaS founder, or enterprise—let&apos;s explore how custom AI can transform your business.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-3">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-semibold text-black">Conversational Systems</div>
                  <div className="text-sm text-gray-500">Save 80-90% on call costs</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-3">
                    <Database className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-semibold text-black">RAG Systems</div>
                  <div className="text-sm text-gray-500">Zero per-query costs</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-3">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-semibold text-black">Enterprise</div>
                  <div className="text-sm text-gray-500">Air-gapped & compliant</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join agencies and founders who&apos;ve already made the switch. Book a consultation and let&apos;s discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
