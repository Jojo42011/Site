import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Cpu, Database, Server, Lock, Zap, Network, Code, Terminal } from "lucide-react";

const platformFeatures = [
  {
    icon: Cpu,
    title: "Ollama Integration",
    description: "Native support for Ollama's local LLM inference engine. Run models like Llama 2, Mistral, CodeLlama, and more completely offline.",
    details: ["70+ Model Support", "GPU Acceleration", "CPU Fallback", "Model Management"],
  },
  {
    icon: Database,
    title: "ChromaDB Vector Store",
    description: "Built-in vector database for RAG capabilities. Store, index, and query embeddings without any cloud dependencies.",
    details: ["Embedding Storage", "Semantic Search", "RAG Pipeline", "Multi-Modal Support"],
  },
  {
    icon: Server,
    title: "Air-Gapped Infrastructure",
    description: "Complete network isolation. Your AI runs on-premises with zero external network requirements after initial deployment.",
    details: ["Network Isolation", "On-Premise Only", "No Internet Required", "Custom Hardware"],
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade encryption at rest and in transit. All data encrypted with AES-256 and secure key management.",
    details: ["AES-256 Encryption", "Key Management", "Secure Channels", "Zero-Knowledge Architecture"],
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for speed and efficiency. Low-latency inference with support for batch processing and concurrent requests.",
    details: ["Sub-Second Latency", "Batch Processing", "Concurrent Requests", "Resource Optimization"],
  },
  {
    icon: Network,
    title: "API & SDK",
    description: "RESTful API and SDKs for seamless integration with your existing systems and workflows.",
    details: ["REST API", "Python SDK", "TypeScript SDK", "Webhooks"],
  },
];

export default function PlatformPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full border border-blue-electric/30 mb-6">
            <Code className="w-4 h-4 text-blue-electric" />
            <span className="text-sm text-gray-300">Open Source Stack</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Powerful Platform.</span>{" "}
            <span className="text-white">Zero Compromises.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built on proven open-source technologies. Ollama, ChromaDB, and secure infrastructure
            working together to deliver enterprise-grade private AI.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="glass-effect rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">System Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-purple-glow to-purple-dark flex items-center justify-center">
                  <Terminal className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Ollama Engine</h3>
                <p className="text-gray-400 text-sm">Local LLM Inference</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-electric to-blue-navy flex items-center justify-center">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">ChromaDB</h3>
                <p className="text-gray-400 text-sm">Vector Storage & RAG</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-purple-glow to-blue-electric flex items-center justify-center">
                  <Server className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Your Infrastructure</h3>
                <p className="text-gray-400 text-sm">Air-Gapped Deployment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">Platform</span>{" "}
            <span className="gradient-text">Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-effect rounded-xl p-6 hover:border-purple-glow/60 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-glow to-blue-electric flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="text-xs text-gray-500 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-glow rounded-full" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}



