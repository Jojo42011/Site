import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Layout, Settings, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Security Assessment",
    description: "We analyze your infrastructure, compliance requirements, and security posture to design the perfect air-gapped solution.",
    duration: "1-2 weeks",
  },
  {
    number: "02",
    icon: Layout,
    title: "Custom Architecture Design",
    description: "Our team designs a tailored system architecture that meets your specific needs while maintaining complete network isolation.",
    duration: "2-3 weeks",
  },
  {
    number: "03",
    icon: Settings,
    title: "Model Tuning & Integration",
    description: "We fine-tune models for your use case, integrate with your existing systems, and configure ChromaDB for your data.",
    duration: "3-4 weeks",
  },
  {
    number: "04",
    icon: Rocket,
    title: "On-Premise Deployment",
    description: "Secure deployment on your infrastructure with comprehensive training, documentation, and ongoing support.",
    duration: "1-2 weeks",
  },
];

export default function ProcessPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="text-white">From Assessment to</span>{" "}
            <span className="gradient-text">Deployment</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven 4-step process to deploy secure, air-gapped AI systems
            tailored to your institution&apos;s needs.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col md:flex-row items-start gap-8"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-purple-glow/50 to-blue-electric/50" />
                )}
                
                {/* Step Number & Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-glow to-blue-electric flex items-center justify-center glow-purple">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 text-6xl font-bold text-charcoal-800 -z-10">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 glass-effect rounded-xl p-8 hover:border-purple-glow/60 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-white">{step.title}</h2>
                    <span className="text-sm text-purple-glow font-semibold">{step.duration}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="glass-effect rounded-2xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-purple-glow mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Schedule a confidential consultation to discuss your security requirements
              and explore how air-gapped AI can transform your institution.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-lg font-semibold text-lg hover:scale-105 transition-transform glow-purple"
            >
              <span>Schedule Consultation</span>
              <Rocket className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

