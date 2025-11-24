import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, Calendar } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="text-white">Let&apos;s Build Your</span>{" "}
            <span className="gradient-text">Private AI System</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Schedule a secure consultation to discuss your requirements and explore
            how air-gapped AI can protect your institution&apos;s data.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Get in Touch</h2>
            <div className="space-y-6 max-w-2xl mx-auto">
              <a
                href="mailto:aethonintelligence@gmail.com"
                className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:border-purple-glow/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-glow to-purple-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white font-semibold">aethonintelligence@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+17373461943"
                className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:border-purple-glow/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-electric to-blue-navy flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white font-semibold">(737) 346-1943</div>
                </div>
              </a>

              <a
                href="https://calendly.com/jahanfraction/15-minute-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:border-purple-glow/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-glow to-blue-electric flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Schedule</div>
                  <div className="text-white font-semibold">15-Minute Demo</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

