"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  ArrowRight,
  Phone,
  Database,
  Bot,
  Sparkles,
  Check,
  Mic,
  Brain,
  Languages,
  Calendar,
  BarChart3,
  Plug,
  Shield,
  Zap,
  MessageSquare,
  FileSearch,
  Workflow,
  Building2
} from "lucide-react";
import Link from "next/link";

const agentTypes = [
  {
    id: "voice-agents",
    icon: Phone,
    title: "Voice Agents",
    tagline: "Human-like conversations, zero per-minute fees",
    description: "Production-ready AI voice agents that handle inbound and outbound calls with natural conversation flow, real-time processing, and seamless handoffs.",
    capabilities: [
      "Sub-300ms latency for natural conversations",
      "Inbound & outbound call handling",
      "Real-time transcription & sentiment analysis",
      "Seamless handoff to human agents",
      "Call recording & analytics",
      "Custom voice personalities"
    ],
    useCases: ["Customer support automation", "Sales outreach", "Appointment scheduling", "Lead qualification"]
  },
  {
    id: "rag-agents",
    icon: Database,
    title: "RAG Knowledge Agents",
    tagline: "Your documents, instantly searchable",
    description: "Intelligent knowledge bases that search, understand, and answer questions from your documents—all running 100% locally with no per-query costs.",
    capabilities: [
      "Semantic search across all document types",
      "PDF, Word, Excel, PowerPoint support",
      "Real-time document indexing",
      "Citation & source tracking",
      "Conversational follow-up queries",
      "Multi-tenant architecture"
    ],
    useCases: ["Internal knowledge bases", "Customer support docs", "Legal contract search", "Technical documentation"]
  },
  {
    id: "automation-agents",
    icon: Bot,
    title: "Automation Agents",
    tagline: "Intelligent workflows, automated decisions",
    description: "AI agents that automate complex business processes—from data processing to decision-making workflows—all without ongoing API costs.",
    capabilities: [
      "Multi-step workflow automation",
      "Decision trees with AI reasoning",
      "Data extraction & processing",
      "Email & message handling",
      "Scheduled task execution",
      "Error handling & retry logic"
    ],
    useCases: ["Lead processing pipelines", "Data enrichment", "Report generation", "Email triage & response"]
  },
  {
    id: "hybrid-agents",
    icon: Sparkles,
    title: "Custom Hybrid Agents",
    tagline: "The best of everything, tailored for you",
    description: "Combine voice, knowledge, and automation capabilities into a single custom agent. Since we build from scratch, anything is possible.",
    capabilities: [
      "Voice + RAG integration",
      "Multi-modal interactions",
      "Complex business logic",
      "Cross-system orchestration",
      "Custom ML model integration",
      "Advanced analytics & reporting"
    ],
    useCases: ["Full customer service platforms", "Sales intelligence systems", "Enterprise AI assistants", "Industry-specific solutions"]
  }
];

const customizationExamples = [
  {
    icon: Plug,
    title: "CRM Integration",
    description: "Deep integration with Salesforce, HubSpot, or custom CRMs. Pull customer data mid-conversation, update records in real-time."
  },
  {
    icon: Mic,
    title: "Custom Voice Training",
    description: "Train voices on your brand's tone. Adjust pacing, emotion, and personality to match your exact requirements."
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "20+ languages with proper cultural nuances. Real-time language detection and code-switching support."
  },
  {
    icon: Calendar,
    title: "Calendar & Scheduling",
    description: "Direct integration with Google Calendar, Outlook, Calendly. Book appointments within the conversation."
  },
  {
    icon: BarChart3,
    title: "Custom Analytics",
    description: "Build the exact dashboards you need. Track metrics that matter to your business—not generic platform stats."
  },
  {
    icon: Shield,
    title: "Compliance Configuration",
    description: "HIPAA, SOC2, GDPR configurations built directly into your agent. Air-gapped deployment options."
  },
  {
    icon: Brain,
    title: "Industry Training",
    description: "Fine-tune models on your industry terminology. Legal, medical, technical—your agent speaks your language."
  },
  {
    icon: Workflow,
    title: "Custom Workflows",
    description: "Complex decision trees, multi-step processes, conditional logic—no template limitations."
  },
  {
    icon: Building2,
    title: "Enterprise SSO",
    description: "SAML, OAuth, Active Directory integration. Enterprise-grade access controls built to your specs."
  }
];

export default function CapabilitiesPage() {
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
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold text-black">Built From Scratch</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">Since We Build Custom,</span>
              <br />
              <span className="gradient-text">Anything Is Possible</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We don&apos;t use templates or pre-built platforms. Every agent is built from scratch, giving you unlimited flexibility to customize every aspect.
            </p>
          </motion.div>

          {/* Agent Types */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Agent Types We Build</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four core categories—but every build is uniquely customized to your requirements.
              </p>
            </motion.div>

            <div className="space-y-8">
              {agentTypes.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl premium-shadow-lg border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    {/* Icon Section */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-black via-gray-900 to-black p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                        <agent.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{agent.title}</h3>
                      <p className="text-purple-300 text-sm font-medium">{agent.tagline}</p>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-9 p-8">
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{agent.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Capabilities
                          </h4>
                          <div className="space-y-2">
                            {agent.capabilities.map((cap, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-gray-700 text-sm">{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Common Use Cases
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.useCases.map((useCase, i) => (
                              <div key={i} className="px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-900 font-medium">
                                {useCase}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Customization Examples */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Customization Examples</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These are just examples—since we build from scratch, we can implement any feature you need.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {customizationExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  className="bg-white rounded-2xl p-6 premium-shadow hover:premium-shadow-lg transition-all border border-gray-100 hover:border-gray-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-black text-lg mb-2">{example.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{example.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* The Key Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-3xl p-8 sm:p-12 border border-gray-100 text-center">
              <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6">
                <FileSearch className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">Don&apos;t See What You Need?</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                This page only scratches the surface. Since we build from scratch using local models, we&apos;re not limited by templates or platform restrictions. If you can describe it, we can build it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Custom ML model integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Proprietary algorithm support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Legacy system integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Industry-specific compliance</span>
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
              Ready to Build Something Custom?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Tell us what you need. We&apos;ll show you exactly how we can build it—custom-tailored to your requirements, deployed in 2-3 days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center"
              >
                Start Your Project
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
