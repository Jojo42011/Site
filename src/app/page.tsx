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
  Play, 
  Star, 
  Zap,
  Bot,
  Cpu,
  Database,
  Target,
  BarChart3,
  Settings,
  Workflow,
  FileText,
  Headphones,
  X,
  Send,
  Search,
  Wrench,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Aethon — Custom AI Automation Consulting Landing Page
// Metallic black and white design focused on consulting funnel

const automationCapabilities = [
  {
    category: "Customer Service",
    icon: <Headphones className="h-6 w-6" />,
    timeSaved: "40-60 hours/week",
    description: "24/7 AI customer support, ticket routing, and response automation",
    features: ["Chatbot integration", "Email automation", "Ticket classification", "Multi-language support"]
  },
  {
    category: "Lead Generation",
    icon: <Target className="h-6 w-6" />,
    timeSaved: "30-50 hours/week", 
    description: "Automated lead discovery, qualification, and nurturing campaigns",
    features: ["Data scraping", "Lead scoring", "Email sequences", "CRM integration"]
  },
  {
    category: "Data Processing",
    icon: <Database className="h-6 w-6" />,
    timeSaved: "25-40 hours/week",
    description: "Automated data entry, analysis, and report generation",
    features: ["Document processing", "Data extraction", "Report automation", "API integrations"]
  },
  {
    category: "Workflow Automation",
    icon: <Workflow className="h-6 w-6" />,
    timeSaved: "20-35 hours/week",
    description: "End-to-end process automation and business logic implementation",
    features: ["Process orchestration", "Task automation", "Approval workflows", "System integration"]
  },
  {
    category: "Content Creation",
    icon: <FileText className="h-6 w-6" />,
    timeSaved: "15-30 hours/week",
    description: "Automated content generation, editing, and publishing",
    features: ["Content writing", "Social media posts", "Email campaigns", "Documentation"]
  },
  {
    category: "Analytics & Reporting",
    icon: <BarChart3 className="h-6 w-6" />,
    timeSaved: "10-20 hours/week",
    description: "Automated data analysis, insights generation, and reporting",
    features: ["Performance tracking", "Predictive analytics", "Custom dashboards", "Alert systems"]
  }
];

const industries = [
  "Real Estate", "Healthcare", "E-commerce", "Manufacturing", "Finance", 
  "Legal", "Construction", "Education", "Retail", "Technology"
];

const testimonials = [
  {
    name: "Sarah Chen",
    company: "TechFlow Solutions",
    role: "Operations Director",
    content: "Aethon automated our entire customer onboarding process. We went from 3 days to 3 hours per client.",
    savings: "85% time reduction"
  },
  {
    name: "Michael Rodriguez", 
    company: "Premier Realty Group",
    role: "Managing Partner",
    content: "The lead generation system they built finds and qualifies 10x more prospects than our previous manual process.",
    savings: "400% more leads"
  },
  {
    name: "Dr. Jennifer Walsh",
    company: "Metro Medical Center", 
    role: "Administrative Director",
    content: "Patient scheduling and follow-up automation has transformed our operations. Zero missed appointments.",
    savings: "100% accuracy"
  }
];

export default function AethonConsultingLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    message: "",
    budget: "",
    timeline: ""
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
        company: "",
        phone: "",
        industry: "",
        message: "",
        budget: "",
        timeline: ""
      });
      setIsContactOpen(false);
    }, 3000);
  };

  // Auto-scroll to modal when it opens
  React.useEffect(() => {
    if (isContactOpen) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        const modal = document.querySelector('[data-modal="contact"]');
        if (modal) {
          modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [isContactOpen]);

    return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Sleek Black Background with Subtle Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      
      {/* Modern Floating Elements - Subtle White/Black */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-white/5 to-gray-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-gray-500/5 to-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-white/3 to-gray-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/1 to-transparent" />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-lg bg-black/95 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Futuristic Aethon Logo */}
              <div className="w-10 h-10 relative">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                {/* Inner glow */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                {/* Central element */}
                <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm"></div>
                {/* Futuristic accent lines */}
                <div className="absolute top-1 left-1/2 w-0.5 h-2 bg-white/60 transform -translate-x-1/2"></div>
                <div className="absolute bottom-1 left-1/2 w-0.5 h-2 bg-white/60 transform -translate-x-1/2"></div>
                <div className="absolute left-1 top-1/2 w-2 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
                <div className="absolute right-1 top-1/2 w-2 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
              </div>
            </div>
            <span className="text-2xl font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                Aethon
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Home</a>
            <a href="#capabilities" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors font-medium">Process</a>
            <a href="#results" className="text-gray-300 hover:text-white transition-colors font-medium">Results</a>
            <Link href="/spa" className="text-gray-300 hover:text-white transition-colors font-medium">Spas</Link>
            <Button 
              onClick={() => window.open('https://calendly.com/jahanfraction/15-minute-demo', '_blank')}
              className="bg-white text-black hover:bg-gray-100 font-semibold shadow-lg shadow-white/20 transition-all duration-200 hover:scale-105"
            >
              Schedule Call
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
                  Custom AI Systems
                </span>
                <br />
                <span className="text-gray-300">
                  Built for Your Business
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                We learn your business, build custom AI systems, and deliver results. Generate more revenue while saving 50+ hours per week—no subscriptions, no generic solutions, just tailored automation that works.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button 
                  onClick={() => window.open('https://calendly.com/jahanfraction/15-minute-demo', '_blank')}
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 font-light px-8 py-4 text-lg shadow-xl shadow-white/25 transition-all duration-200 hover:scale-105"
                >
                  Schedule Call
                </Button>
                <Button 
                  onClick={() => setIsContactOpen(true)}
                  variant="outline" 
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm bg-white/5 transition-all duration-200 hover:scale-105 font-light"
                >
                  Start Consultation
                </Button>
              </div>

              {/* Stats Section */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">50+</div>
                  <div className="text-sm text-gray-300 font-light">Hours Saved Weekly</div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">$2M+</div>
                  <div className="text-sm text-gray-300 font-light">Revenue Generated</div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">95%</div>
                  <div className="text-sm text-gray-300 font-light">Efficiency Increase</div>
                </div>
                <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">24/7</div>
                  <div className="text-sm text-gray-300 font-light">AI Automation</div>
                </div>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="relative z-10 py-24 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 tracking-tight">
                What We Can <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Automate</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Every system is custom-built for your specific business needs and bottlenecks
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationCapabilities.map((capability, index) => (
              <m.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl group shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                        <div className="text-white">
                          {capability.icon}
          </div>
                    </div>
                        <div>
                          <CardTitle className="text-black text-xl font-light tracking-tight">{capability.category}</CardTitle>
                          <Badge className="bg-gray-900 text-white border-gray-900 mt-1">
                            {capability.timeSaved}
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
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                  </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
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
                Our <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                From consultation to deployment, we deliver custom AI solutions that work
              </p>
            </m.div>
          </div>
          <div className="space-y-32">
            {[
              {
                number: "01",
                title: "We Identify Your Bottlenecks",
                description: "Our team analyzes your current workflows to pinpoint inefficiencies and automation opportunities that will deliver maximum ROI.",
                icon: <Search className="h-8 w-8" />,
                features: [
                  "Workflow analysis and mapping",
                  "Bottleneck identification", 
                  "ROI opportunity assessment",
                  "Custom automation strategy"
                ]
              },
              {
                number: "02",
                title: "We Build Your Custom Agent", 
                description: "We design and develop AI systems specifically tailored to your business needs, industry requirements, and existing tech stack.",
                icon: <Wrench className="h-8 w-8" />,
                features: [
                  "Custom AI system design",
                  "Integration with existing tools",
                  "Industry-specific optimization", 
                  "Testing and quality assurance"
                ]
              },
              {
                number: "03",
                title: "You Get Time, Efficiency & Revenue",
                description: "Deploy your new AI systems and watch as your team gains 50+ hours per week while generating more revenue and reducing costs.",
                icon: <TrendingUp className="h-8 w-8" />,
                features: [
                  "50+ hours saved weekly",
                  "Increased revenue generation",
                  "Reduced human error",
                  "Scalable automation solutions"
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
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="text-8xl font-light text-gray-200 absolute -top-4 -left-4 tracking-tight">
                      {step.number}
              </div>
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
                      <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                        <div className="text-white">
                          {step.icon}
            </div>
          </div>
            </div>
                </div>
              </div>
              
                {/* Content */}
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
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
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
                Proven <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Results</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                Real businesses, real results, real ROI
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
            <m.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/40 border-slate-700/40 h-full backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>
                    <p className="text-black mb-6 leading-relaxed font-light">"{testimonial.content}"</p>
                    <div className="border-t border-gray-300 pt-6">
                      <div className="font-light text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.role}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.company}</div>
                      <Badge className="bg-gray-900 text-white border-gray-900 mt-2">
                        {testimonial.savings}
                      </Badge>
                </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
                </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Hours Saved Weekly" },
              { number: "95%", label: "Process Accuracy" },
              { number: "40+", label: "Businesses Automated" },
              { number: "300%", label: "Average ROI" }
            ].map((stat, index) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </m.div>
            ))}
                  </div>
                  </div>
      </section>


      {/* Schedule Call Section */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <m.div
            initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
              Ready to <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Automate</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
              Let's discuss your bottlenecks and build a custom solution that saves you time and money.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                onClick={() => window.open('https://calendly.com/jahanfraction/15-minute-demo', '_blank')}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 font-light px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Schedule 15-Min Demo
              </Button>
              <Button 
                onClick={() => setIsContactOpen(true)}
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-light transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Consultation
                </Button>
              </div>
            </m.div>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <m.div
            data-modal="contact"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/20 rounded-3xl p-8 w-full max-w-3xl max-h-[95vh] overflow-y-auto backdrop-blur-xl shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Start Your Automation Project</h3>
                <p className="text-gray-300">Let's discuss your bottlenecks and build a custom solution</p>
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
                <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-300">We'll get back to you within 24 hours to discuss your automation needs.</p>
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder="your@email.com"
                    />
              </div>
            </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Company</label>
                    <Input
                      value={contactForm.company}
                      onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder="Your company name"
                    />
          </div>
          <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Phone</label>
                    <Input
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
          </div>
    </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Industry</label>
                    <select
                      value={contactForm.industry}
                      onChange={(e) => setContactForm(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
          </div>
          <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Timeline</label>
                    <select
                      value={contactForm.timeline}
                      onChange={(e) => setContactForm(prev => ({ ...prev, timeline: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                    >
                      <option value="">When do you need this?</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="6-months">Within 6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
          </div>
    </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Budget Range</label>
                  <select
                    value={contactForm.budget}
                    onChange={(e) => setContactForm(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  >
                    <option value="">Select budget range</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
    </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Tell us about your bottlenecks *</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    className="bg-slate-800/60 border-slate-600/60 text-white rounded-xl px-4 py-3 backdrop-blur-sm focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-200 resize-none"
                    placeholder="What processes are taking too much time? What tasks are repetitive? What would you like to automate?"
                  />
      </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white font-semibold py-4 h-14 rounded-xl shadow-xl shadow-white/25 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Send Message
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
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="relative">
                {/* Futuristic Aethon Logo - Footer Version */}
                <div className="w-8 h-8 relative">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                  {/* Inner glow */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  {/* Central element */}
                  <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm"></div>
                  {/* Futuristic accent lines */}
                  <div className="absolute top-0.5 left-1/2 w-0.5 h-1.5 bg-white/60 transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0.5 left-1/2 w-0.5 h-1.5 bg-white/60 transform -translate-x-1/2"></div>
                  <div className="absolute left-0.5 top-1/2 w-1.5 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
                  <div className="absolute right-0.5 top-1/2 w-1.5 h-0.5 bg-white/60 transform -translate-y-1/2"></div>
                </div>
              </div>
              <span className="text-xl font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                Aethon
          </span>
          </div>
          
          {/* Contact Information */}
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
            © 2024 Aethon. Custom AI automation solutions.
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
}
