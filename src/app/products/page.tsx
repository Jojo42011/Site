"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Phone, 
  MessageSquare, 
  Bot, 
  FileText, 
  Code, 
  BarChart3, 
  Mail, 
  Search,
  Video,
  Headphones,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

const allProducts = [
  {
    icon: Phone,
    title: "AI Call Agents",
    description: "Intelligent voice agents that handle customer calls 24/7. Natural conversations, call routing, and issue resolution with human-like quality.",
    features: [
      "Real-time voice processing",
      "Multi-language support",
      "Call transcription & analytics",
      "Seamless handoff to humans"
    ],
    savings: "85-90% cost reduction",
    useCase: "Customer support, sales calls, appointment scheduling",
    monthlyCost: "$300-600/mo",
    vsCloud: "$8K-15K/mo on cloud APIs"
  },
  {
    icon: MessageSquare,
    title: "Support Chatbots",
    description: "Advanced conversational AI for customer support. Handle tickets, answer questions, and resolve issues instantly without human intervention.",
    features: [
      "80%+ ticket deflection rate",
      "Context-aware responses",
      "Integration with CRM systems",
      "24/7 availability"
    ],
    savings: "80-85% cost reduction",
    useCase: "Customer service, help desks, FAQ automation",
    monthlyCost: "$200-500/mo",
    vsCloud: "$10K-20K/mo on cloud APIs"
  },
  {
    icon: Bot,
    title: "AI Agents & Workflows",
    description: "Autonomous AI agents that execute complex workflows. Data processing, task automation, and intelligent decision-making at scale.",
    features: [
      "Multi-step reasoning",
      "Tool integration (APIs, databases)",
      "Error handling & retries",
      "Audit logs & monitoring"
    ],
    savings: "85-90% cost reduction",
    useCase: "Data processing, workflow automation, business intelligence",
    monthlyCost: "$400-800/mo",
    vsCloud: "$15K-30K/mo on cloud APIs"
  },
  {
    icon: FileText,
    title: "Content Generation",
    description: "High-quality content creation at scale. Blog posts, marketing copy, product descriptions, and social media content with brand consistency.",
    features: [
      "Brand voice training",
      "SEO optimization",
      "Multi-format output",
      "Bulk generation"
    ],
    savings: "82-88% cost reduction",
    useCase: "Content marketing, SEO, product descriptions",
    monthlyCost: "$250-600/mo",
    vsCloud: "$8K-18K/mo on cloud APIs"
  },
  {
    icon: Code,
    title: "Code Assistant",
    description: "GitHub Copilot alternative that runs on your infrastructure. Code generation, review, documentation, and refactoring with complete privacy.",
    features: [
      "Multi-language support",
      "Code review & suggestions",
      "Documentation generation",
      "Security scanning"
    ],
    savings: "88-92% cost reduction",
    useCase: "Software development, code review, documentation",
    monthlyCost: "$300-700/mo",
    vsCloud: "$12K-25K/mo on cloud APIs"
  },
  {
    icon: BarChart3,
    title: "Data Analysis & Insights",
    description: "Intelligent data analysis and reporting. Extract insights from customer data, generate reports, and surface trends without exposing sensitive data.",
    features: [
      "Natural language queries",
      "Automated report generation",
      "Trend analysis",
      "Data visualization"
    ],
    savings: "80-85% cost reduction",
    useCase: "Business intelligence, analytics, reporting",
    monthlyCost: "$350-650/mo",
    vsCloud: "$10K-20K/mo on cloud APIs"
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Personalized email campaigns and automation. Outreach, follow-ups, and customer communications at scale with AI-powered personalization.",
    features: [
      "Personalization at scale",
      "A/B testing",
      "Send time optimization",
      "Engagement tracking"
    ],
    savings: "87-90% cost reduction",
    useCase: "Email marketing, customer communication, outreach",
    monthlyCost: "$200-450/mo",
    vsCloud: "$6K-12K/mo on cloud APIs"
  },
  {
    icon: Search,
    title: "Document Search & RAG",
    description: "Private knowledge base with semantic search. Search contracts, documents, and internal wikis with complete data privacy and security.",
    features: [
      "Semantic search",
      "Multi-format support",
      "Real-time indexing",
      "Access control"
    ],
    savings: "83-87% cost reduction",
    useCase: "Knowledge bases, document search, internal wikis",
    monthlyCost: "$300-600/mo",
    vsCloud: "$9K-18K/mo on cloud APIs"
  },
  {
    icon: Video,
    title: "Video Content Analysis",
    description: "AI-powered video analysis and transcription. Extract insights, generate summaries, and create searchable content from video libraries.",
    features: [
      "Video transcription",
      "Scene detection",
      "Content summarization",
      "Searchable video library"
    ],
    savings: "85-90% cost reduction",
    useCase: "Video content analysis, training materials, media libraries",
    monthlyCost: "$400-800/mo",
    vsCloud: "$15K-30K/mo on cloud APIs"
  },
  {
    icon: Headphones,
    title: "Voice Assistants",
    description: "Custom voice assistants for your products. Natural language understanding, voice commands, and conversational interfaces.",
    features: [
      "Voice recognition",
      "Intent understanding",
      "Multi-modal interactions",
      "Custom wake words"
    ],
    savings: "86-91% cost reduction",
    useCase: "Smart devices, IoT, voice-controlled applications",
    monthlyCost: "$350-700/mo",
    vsCloud: "$12K-25K/mo on cloud APIs"
  }
];

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Light purple background accents */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
        
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">All AI Products</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our complete range of enterprise-grade AI products. Same quality as cloud providers, fraction of the monthly costs and complete ownership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {allProducts.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="h-full bg-white rounded-2xl p-8 premium-border-hover premium-shadow hover:premium-shadow-lg transition-all duration-300 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <product.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-xs font-bold text-green-700">{product.savings}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-3 leading-tight">{product.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{product.description}</p>

                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <span className="text-black mr-2 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cost Comparison</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">With Aethon</span>
                          <span className="text-sm font-bold text-black">{product.monthlyCost}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 line-through">Cloud APIs</span>
                          <span className="text-xs text-gray-400 line-through">{product.vsCloud}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 bg-black rounded-3xl p-12 text-center premium-shadow-lg"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Deploy Your AI Products?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get started with production-ready AI systems on your infrastructure. Complete ownership, massive savings, enterprise quality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                href="/#calculator"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Calculate Savings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
