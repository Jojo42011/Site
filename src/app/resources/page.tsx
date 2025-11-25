import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Download, ExternalLink, Book, Shield } from "lucide-react";

const resources = [
  {
    icon: FileText,
    title: "Air-Gapped AI Whitepaper",
    description: "Comprehensive guide to deploying private AI systems in critical infrastructure.",
    type: "PDF",
    link: "#",
  },
  {
    icon: Book,
    title: "Security Readiness Checklist",
    description: "Evaluate your infrastructure's readiness for air-gapped AI deployment.",
    type: "Checklist",
    link: "#",
  },
  {
    icon: Shield,
    title: "Compliance Guide",
    description: "Understanding HIPAA, ITAR, and FedRAMP requirements for private AI systems.",
    type: "Guide",
    link: "#",
  },
];

export default function ResourcesPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-electric rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="text-white">Resources &</span>{" "}
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to understand, evaluate, and deploy air-gapped AI systems.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="glass-effect rounded-xl p-6 hover:border-purple-glow/60 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-glow to-blue-electric flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-purple-glow font-semibold">{resource.type}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{resource.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="inline-flex items-center space-x-2 text-purple-glow hover:text-purple-light transition-colors text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What does 'air-gapped' mean?",
                  a: "Air-gapped means the system is completely isolated from external networks. No internet connection is required after initial deployment, ensuring zero data leakage and maximum security.",
                },
                {
                  q: "Which models are supported?",
                  a: "We support all models compatible with Ollama, including Llama 2, Mistral, CodeLlama, Phi, and 70+ other open-source models. Custom model integration is also available.",
                },
                {
                  q: "How long does deployment take?",
                  a: "Typical deployment takes 8-12 weeks from initial assessment to production, depending on your infrastructure complexity and compliance requirements.",
                },
                {
                  q: "What hardware is required?",
                  a: "Requirements vary by use case, but typically include servers with GPU support (NVIDIA recommended), sufficient RAM for model inference, and storage for ChromaDB vector database.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-purple-glow/20 pb-6 last:border-0">
                  <h3 className="text-xl font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}



