import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Heart, DollarSign, Scale, GraduationCap, Briefcase, Shield, Lock, Check } from "lucide-react";

const solutions = [
  {
    icon: Building2,
    title: "Government & Defense",
    description: "Classified intelligence analysis and secure communications for defense contractors and government agencies.",
    features: ["ITAR Compliance", "Top Secret Clearance", "Air-Gapped Networks", "Zero Telemetry"],
    gradient: "from-blue-electric to-blue-navy",
  },
  {
    icon: Heart,
    title: "Healthcare Systems",
    description: "HIPAA-compliant AI for patient data analysis, medical research, and clinical decision support.",
    features: ["HIPAA Compliant", "PHI Protection", "Audit Trails", "BAA Ready"],
    gradient: "from-purple-glow to-purple-dark",
  },
  {
    icon: DollarSign,
    title: "Financial Institutions",
    description: "Secure fraud detection, risk analysis, and regulatory compliance for banks and financial services.",
    features: ["SOC 2 Type II", "PCI DSS", "Regulatory Compliance", "Real-time Monitoring"],
    gradient: "from-blue-electric to-purple-glow",
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    description: "Confidential case analysis, contract review, and privileged document processing for law firms.",
    features: ["Attorney-Client Privilege", "Confidentiality", "Document Security", "Compliance Ready"],
    gradient: "from-purple-dark to-blue-navy",
  },
  {
    icon: GraduationCap,
    title: "Research Institutions",
    description: "Private research data analysis and intellectual property protection for universities and labs.",
    features: ["IP Protection", "Research Privacy", "Collaboration Tools", "Data Sovereignty"],
    gradient: "from-purple-glow to-blue-electric",
  },
  {
    icon: Briefcase,
    title: "Enterprise Security",
    description: "Internal knowledge bases, secure customer support, and confidential business intelligence.",
    features: ["Enterprise SSO", "Role-Based Access", "Audit Logging", "Custom Deployment"],
    gradient: "from-blue-navy to-purple-glow",
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full border border-purple-glow/30 mb-6">
            <Shield className="w-4 h-4 text-purple-glow" />
            <span className="text-sm text-gray-300">Industry-Specific Solutions</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="text-white">Private AI for</span>{" "}
            <span className="gradient-text">Every Critical Sector</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tailored air-gapped AI systems designed to meet the unique security and compliance requirements
            of your industry.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className="group relative glass-effect rounded-2xl p-8 hover:border-purple-glow/60 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{solution.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{solution.description}</p>
                <ul className="space-y-3">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3 text-gray-300">
                      <Check className="w-5 h-5 text-purple-glow flex-shrink-0" />
                      <span>{feature}</span>
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



