"use client";
import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Mail, 
  MessageSquare, 
  Phone, 
  Star, 
  Zap,
  Bot,
  FileText,
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Scale,
  Award,
  BarChart3,
  X,
  Send,
  Headphones,
  UserCheck,
  BookOpen,
  Search,
  Gavel,
  Lock,
  Database,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Legal AI Capabilities
const legalCapabilities = [
  {
    category: "Local Legal AI Assistant",
    icon: <Brain className="h-6 w-6" />,
    savings: "70% faster legal research",
    description: "Private GPT trained exclusively on your firm's documents and legal precedents, running securely on your infrastructure",
    features: ["Document-trained AI", "Local deployment", "Zero data sharing", "Custom legal knowledge base"]
  },
  {
    category: "Contract Analysis & Review",
    icon: <FileText className="h-6 w-6" />,
    savings: "80% reduction in review time", 
    description: "Automated contract analysis, clause identification, risk assessment, and compliance checking across all practice areas",
    features: ["Risk identification", "Clause comparison", "Compliance checking", "Redlining automation"]
  },
  {
    category: "Legal Research Automation",
    icon: <Search className="h-6 w-6" />,
    savings: "60% faster + reduced paralegal costs",
    description: "Accelerate legal research by 60% using AI that identifies statutes, case law, and arguments — replacing hours of manual paralegal work",
    features: ["Case law analysis", "Precedent identification", "Citation verification", "Argument structuring"]
  },
  {
    category: "Document Generation",
    icon: <BookOpen className="h-6 w-6" />,
    savings: "Save 15+ hours/week",
    description: "Auto-generate pleadings, contracts, and motions using your firm's preferred format — saving 15+ hours/week in drafting time",
    features: ["Template automation", "Custom formatting", "Precedent integration", "Multi-jurisdiction support"]
  },
  {
    category: "Client Communication",
    icon: <Users className="h-6 w-6" />,
    savings: "50% reduction in admin time",
    description: "Automated client updates, case status reports, and intelligent intake forms that capture all necessary information",
    features: ["Status updates", "Intake automation", "Client portals", "Communication scheduling"]
  },
  {
    category: "Compliance & Ethics",
    icon: <ShieldCheck className="h-6 w-6" />,
    savings: "100% ethics compliance",
    description: "Automated conflict checking, deadline tracking, and ethics compliance monitoring across all matters. Ensure full ABA and state bar compliance with automated audit trails and deadline checks.",
    features: ["Conflict detection", "Deadline management", "Ethics monitoring", "Audit trails"]
  }
];

const legalStats = [
  {
    number: "$394B",
    label: "Legal Services Market Size",
    growth: "Growing 4.1% annually"
  },
  {
    number: "89%",
    label: "Lawyers Report Being Overwhelmed",
    growth: "ABA Tech Report 2024"
  },
  {
    number: "47%",
    label: "Time Spent on Admin Tasks",
    growth: "Could be automated"
  },
  {
    number: "68%",
    label: "Firms Want AI Solutions",
    growth: "But need secure deployment"
  }
];

const legalTestimonials = [
  {
    name: "Sarah Mitchell",
    company: "Mitchell & Associates",
    role: "Managing Partner",
    content: "The local AI system trained on our 20 years of case files has revolutionized our practice. It's like having our most experienced attorney available 24/7, but it never shares our confidential information. Our contract review time went from days to hours.",
    savings: "70% faster document review",
    practiceArea: "Corporate Law, M&A"
  },
  {
    name: "David Chen", 
    company: "Chen Immigration Law",
    role: "Senior Partner",
    content: "Having an AI that understands immigration law inside and out, trained specifically on our successful cases, has been game-changing. It drafts petitions, identifies potential issues, and helps us serve 3x more clients without compromising quality.",
    savings: "200% increase in client capacity",
    practiceArea: "Immigration Law"
  },
  {
    name: "Maria Rodriguez",
    company: "Rodriguez Criminal Defense", 
    role: "Criminal Defense Attorney",
    content: "The AI analyzes case precedents and identifies defense strategies I might have missed. It's trained on criminal law specifically and runs entirely on our servers - no client data ever leaves our office. My case preparation time dropped by 60%.",
    savings: "60% reduction in prep time",
    practiceArea: "Criminal Defense"
  }
];

const practiceAreas = [
  "Corporate Law", "Litigation", "Real Estate", "Family Law", "Criminal Defense", 
  "Immigration", "Personal Injury", "Employment Law", "Intellectual Property", 
  "Estate Planning", "Tax Law", "Bankruptcy", "Environmental Law", "Healthcare Law"
];

export default function LegalLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    firm: "",
    phone: "",
    practiceAreas: "",
    firmSize: "",
    message: "",
    currentSoftware: "",
    dataPrivacyConcerns: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({
        name: "",
        email: "",
        firm: "",
        phone: "",
        practiceAreas: "",
        firmSize: "",
        message: "",
        currentSoftware: "",
        dataPrivacyConcerns: ""
      });
      setIsContactOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects with Legal Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      
      {/* Floating Elements with Legal/Justice Theme */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-slate-500/3 to-gray-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg bg-black/95 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute top-1 left-1/2 w-0.5 h-2 bg-white/60 transform -translate-x-1/2"></div>
                <div className="absolute bottom-1 left-1/2 w-0.5 h-2 bg-white/60 transform -translate-x-1/2"></div>
                <div className="absolute left-1 top-1/2 w-2 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
                <div className="absolute right-1 top-1/2 w-2 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
              </div>
            </div>
            <span className="text-2xl font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                Aethon
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#results" className="text-gray-300 hover:text-white transition-colors font-medium">Results</a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors font-medium">Process</a>
            <Link href="/spa" className="text-gray-300 hover:text-white transition-colors font-medium">Spas</Link>
            <Button 
              onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105"
            >
              Book Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight tracking-tight">
                <span className="text-white">
                  Secure AI Legal Assistant
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Trained on Your Cases
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Deploy a private GPT trained exclusively on your firm's documents and legal expertise. No data sharing, no security risks—just powerful AI that understands your practice and accelerates your legal work by 70%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button 
                  onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-light px-8 py-4 text-lg shadow-xl shadow-blue-500/25 transition-all duration-200 hover:scale-105"
                >
                  <Scale className="h-5 w-5 mr-2" />
                  See Legal AI Demo
                </Button>
                <Button 
                  onClick={() => setIsContactOpen(true)}
                  variant="outline" 
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm bg-white/5 transition-all duration-200 hover:scale-105 font-light"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Get Custom Quote
                </Button>
              </div>

              {/* Legal Industry Stats */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {legalStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">{stat.number}</div>
                    <div className="text-sm text-gray-300 font-light mb-1">{stat.label}</div>
                    <div className="text-xs text-blue-400 font-light">{stat.growth}</div>
                  </div>
                ))}
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 tracking-tight">
                AI Solutions for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Legal Professionals</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Secure, private AI trained on legal precedents and your firm's expertise
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalCapabilities.map((capability, index) => (
              <m.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-indigo-700 transition-colors">
                        <div className="text-white">
                          {capability.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-black text-xl font-light tracking-tight">{capability.category}</CardTitle>
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none mt-1">
                          {capability.savings}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-black text-base font-light">
                      {capability.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {capability.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-black font-light">
                          <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>

          {/* Practice Areas */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Supporting All Practice Areas</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {practiceAreas.map((area, index) => (
                <Badge key={index} variant="outline" className="text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-colors">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="relative z-10 py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                Real <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Legal Firm Results</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                See how law firms are transforming their practice with secure AI
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {legalTestimonials.map((testimonial, index) => (
              <m.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 h-full shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-blue-400 text-blue-400" />
                      ))}
                    </div>
                    <p className="text-black mb-6 leading-relaxed font-light">"{testimonial.content}"</p>
                    <div className="border-t border-gray-300 pt-6">
                      <div className="font-light text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.role}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.company}</div>
                      <div className="text-xs text-blue-600 font-light mt-1">{testimonial.practiceArea}</div>
                      <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none mt-2">
                        {testimonial.savings}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>

          {/* ROI Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "70%", label: "Faster Legal Research" },
              { number: "80%", label: "Reduction in Review Time" },
              { number: "60%", label: "Less Case Prep Time" },
              { number: "100%", label: "Data Privacy Maintained" }
            ].map((stat, index) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                Secure <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Implementation Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Your legal AI deployed securely within your firm in 2-3 weeks
              </p>
            </m.div>
          </div>
          
          <div className="space-y-32">
            {[
              {
                number: "01",
                title: "Legal Practice Analysis",
                description: "We analyze your firm's practice areas, document types, and workflows to design an AI system tailored to your specific legal expertise and needs.",
                icon: <Scale className="h-8 w-8" />,
                features: [
                  "Practice area assessment",
                  "Document inventory analysis", 
                  "Workflow optimization mapping",
                  "Security requirements review"
                ]
              },
              {
                number: "02",
                title: "Secure AI Training & Deployment", 
                description: "Train your private legal AI on your firm's documents and legal knowledge, deployed entirely on your infrastructure with zero external data sharing.",
                icon: <Lock className="h-8 w-8" />,
                features: [
                  "Local model training",
                  "Document knowledge integration",
                  "On-premises deployment", 
                  "Zero data transmission"
                ]
              },
              {
                number: "03",
                title: "Legal Team Integration",
                description: "Launch your AI assistant with full team training and ongoing optimization to maximize efficiency while maintaining attorney-client privilege.",
                icon: <Users className="h-8 w-8" />,
                features: [
                  "Attorney training sessions",
                  "Integration with legal software",
                  "Performance optimization",
                  "Ongoing support & updates"
                ]
              }
            ].map((step, index) => (
              <m.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="text-8xl font-light text-gray-200 absolute -top-4 -left-4 tracking-tight">
                      {step.number}
                    </div>
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 max-w-2xl">
                  <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                    {step.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
              Ready to Transform Your <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Legal Practice</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
              Join forward-thinking law firms using secure AI to accelerate legal work while maintaining complete confidentiality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-light px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Book Your Legal AI Demo
              </Button>
              <Button 
                onClick={() => setIsContactOpen(true)}
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-light transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Get Custom Legal Quote
              </Button>
            </div>
          </m.div>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/20 rounded-3xl p-8 w-full max-w-3xl max-h-[95vh] overflow-y-auto backdrop-blur-xl shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Get Your Custom Legal AI Solution</h3>
                <p className="text-gray-300">Tell us about your firm and we'll create a tailored legal AI system</p>
              </div>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setIsContactOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Request Sent!</h4>
                <p className="text-gray-300">We'll analyze your legal practice needs and get back to you within 24 hours with a custom AI proposal.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Name *</label>
                    <Input
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Email *</label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="your@lawfirm.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Law Firm Name</label>
                    <Input
                      value={contactForm.firm}
                      onChange={(e) => setContactForm(prev => ({ ...prev, firm: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="Your law firm name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Phone</label>
                    <Input
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Firm Size</label>
                    <select
                      value={contactForm.firmSize}
                      onChange={(e) => setContactForm(prev => ({ ...prev, firmSize: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    >
                      <option value="">How many attorneys?</option>
                      <option value="solo">Solo practitioner</option>
                      <option value="2-5">2-5 attorneys</option>
                      <option value="6-20">6-20 attorneys</option>
                      <option value="21-50">21-50 attorneys</option>
                      <option value="50+">50+ attorneys</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Current Legal Software</label>
                    <Input
                      value={contactForm.currentSoftware}
                      onChange={(e) => setContactForm(prev => ({ ...prev, currentSoftware: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="e.g. Clio, PracticePanther, LexisNexis"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Primary Practice Areas</label>
                  <Input
                    value={contactForm.practiceAreas}
                    onChange={(e) => setContactForm(prev => ({ ...prev, practiceAreas: e.target.value }))}
                    className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="e.g. Corporate Law, Litigation, Real Estate, Family Law"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Data Privacy Concerns</label>
                  <Input
                    value={contactForm.dataPrivacyConcerns}
                    onChange={(e) => setContactForm(prev => ({ ...prev, dataPrivacyConcerns: e.target.value }))}
                    className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Any specific security or confidentiality requirements?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">What legal tasks take the most time? *</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="bg-slate-800/60 border-slate-600/60 text-white rounded-xl px-4 py-3 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-none"
                    placeholder="e.g. Contract review, legal research, document drafting, case preparation, client communications..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-semibold py-4 h-14 rounded-xl shadow-xl shadow-blue-500/25 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      Analyzing Your Legal Needs...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Get My Custom Legal AI Solution
                    </>
                  )}
                </Button>
              </form>
            )}
          </m.div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="relative">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm"></div>
                  <div className="absolute top-0.5 left-1/2 w-0.5 h-1.5 bg-white/60 transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0.5 left-1/2 w-0.5 h-1.5 bg-white/60 transform -translate-x-1/2"></div>
                  <div className="absolute left-0.5 top-1/2 w-1.5 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
                  <div className="absolute right-0.5 top-1/2 w-1.5 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
                </div>
              </div>
              <span className="text-xl font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                Aethon
              </span>
            </Link>
            
            <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:aethonintelligence@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  aethonintelligence@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:+17373461943" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  (737) 346-1943
                </a>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm font-light">
              © 2024 Aethon. Legal AI Solutions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
