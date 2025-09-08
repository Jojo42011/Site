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
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Heart,
  Award,
  BarChart3,
  X,
  Send,
  Headphones,
  UserCheck,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Voice AI Receptionist Capabilities - Industry Neutral
const voiceAgentCapabilities = [
  {
    category: "24/7 Call Handling",
    icon: <Phone className="h-6 w-6" />,
    savings: "85% reduction in missed calls",
    description: "Never miss another customer call with round-the-clock professional call answering and appointment scheduling",
    features: ["After-hours coverage", "Holiday & weekend support", "Multiple phone line handling", "Call routing & transfers"]
  },
  {
    category: "Appointment Scheduling",
    icon: <Calendar className="h-6 w-6" />,
    savings: "200% increase in bookings", 
    description: "Intelligent scheduling that checks availability, books appointments instantly, and sends confirmations",
    features: ["Real-time calendar sync", "Automated confirmations", "Rescheduling & cancellations", "Waitlist management"]
  },
  {
    category: "Customer Qualification",
    icon: <UserCheck className="h-6 w-6" />,
    savings: "60% better lead quality",
    description: "Pre-qualify customers, collect project details, and ensure you only spend time on serious inquiries",
    features: ["Lead scoring", "Project requirement gathering", "Budget qualification", "Urgency assessment"]
  },
  {
    category: "Service Consultation",
    icon: <Headphones className="h-6 w-6" />,
    savings: "50% faster sales process",
    description: "Explain your services, provide pricing information, and answer common questions professionally",
    features: ["Service explanations", "Pricing information", "FAQ responses", "Process walkthroughs"]
  },
  {
    category: "Follow-up & Retention",
    icon: <Heart className="h-6 w-6" />,
    savings: "40% increase in repeat business",
    description: "Automated follow-ups, satisfaction surveys, and customer retention campaigns",
    features: ["Post-service follow-up", "Satisfaction surveys", "Maintenance reminders", "Loyalty programs"]
  },
  {
    category: "Business Intelligence",
    icon: <BarChart3 className="h-6 w-6" />,
    savings: "Complete call analytics",
    description: "Track call volume, conversion rates, and customer insights to optimize your business",
    features: ["Call volume tracking", "Conversion analytics", "Customer insights", "Performance reports"]
  }
];

const businessStats = [
  {
    number: "42%",
    label: "Revenue Lost to Missed Calls",
    growth: "Across all service industries"
  },
  {
    number: "73%",
    label: "Customers Prefer Instant Response",
    growth: "Up from 45% in 2020"
  },
  {
    number: "68%",
    label: "Businesses Want 24/7 Coverage",
    growth: "Post-pandemic shift"
  },
  {
    number: "85%",
    label: "Calls Outside Business Hours",
    growth: "Go to voicemail"
  }
];

const businessTestimonials = [
  {
    name: "Mike Rodriguez",
    company: "Rodriguez Auto Body",
    role: "Owner",
    content: "We were losing thousands every month from missed calls while working on cars. Now our AI captures every insurance inquiry, schedules estimates instantly, and even follows up with customers. Our booking rate went from 30% to 85% overnight.",
    savings: "200% booking increase",
    industry: "Auto Body & Collision Repair"
  },
  {
    name: "Dr. Amanda Richardson", 
    company: "Serenity Medical Spa",
    role: "Medical Director",
    content: "The AI converts 3x more phone inquiries into actual appointments than our human staff ever did. It never sleeps, never takes breaks, and always gives perfect treatment explanations. Our revenue jumped 40% in just 2 months.",
    savings: "300% better conversion",
    industry: "Medical Spa & Wellness"
  },
  {
    name: "Tom Chen",
    company: "Elite HVAC Services", 
    role: "Operations Manager",
    content: "Emergency calls used to go to voicemail when our techs were busy. Now our AI handles everything - schedules service calls, explains pricing, and even upsells maintenance plans. We've never missed an emergency call since.",
    savings: "100% call capture rate",
    industry: "HVAC & Emergency Services"
  }
];

const targetIndustries = [
  "Auto Body Shops", "HVAC Services", "Dental Practices", "Medical Spas", 
  "Plumbing Services", "Electrical Contractors", "Law Firms", "Veterinary Clinics", 
  "Massage Therapy", "Home Services", "Roofing Companies", "Landscaping",
  "Cleaning Services", "Wellness Centers", "Beauty Salons", "Repair Services"
];

export default function VoiceAgentLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    locations: "",
    message: "",
    monthlyCalls: "",
    currentSystem: ""
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
        locations: "",
        message: "",
        monthlyCalls: "",
        currentSystem: ""
      });
      setIsContactOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Sleek Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      
      {/* Floating Elements with Business Theme */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/3 to-green-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      
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
            <Button 
              onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 font-semibold shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105"
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
                  Never Miss Another
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Customer Call Again
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Transform your business with an AI voice receptionist that handles calls 24/7, books appointments instantly, and increases your revenue by 40% while you focus on serving customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  onClick={() => window.open('https://youtube.com/shorts/FyGV1ZXO5-U?si=rlHoy5AjcrK-yhAH', '_blank')}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-light px-8 py-4 text-lg shadow-xl shadow-red-500/25 transition-all duration-200 hover:scale-105"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Live Demo
                </Button>
                <Button 
                  onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 font-light px-8 py-4 text-lg shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Book Consultation
                </Button>
              </div>
              
              <div className="flex justify-center mb-16">
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

              {/* Business Stats */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {businessStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">{stat.number}</div>
                    <div className="text-sm text-gray-300 font-light mb-1">{stat.label}</div>
                    <div className="text-xs text-emerald-400 font-light">{stat.growth}</div>
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
                Everything Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Business Needs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Built for service businesses that rely on appointments and customer calls
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {voiceAgentCapabilities.map((capability, index) => (
              <m.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl group shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center group-hover:from-emerald-700 group-hover:to-teal-700 transition-colors">
                        <div className="text-white">
                          {capability.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-black text-xl font-light tracking-tight">{capability.category}</CardTitle>
                        <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none mt-1">
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
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>

          {/* Target Industries */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Perfect for Service-Based Businesses</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {targetIndustries.map((industry, index) => (
                <Badge key={index} variant="outline" className="text-gray-700 border-gray-300 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                  {industry}
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
                Real <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Business Results</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                See how businesses across industries are transforming with our AI voice receptionist
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {businessTestimonials.map((testimonial, index) => (
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
                        <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                    <p className="text-black mb-6 leading-relaxed font-light">"{testimonial.content}"</p>
                    <div className="border-t border-gray-300 pt-6">
                      <div className="font-light text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.role}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.company}</div>
                      <div className="text-xs text-emerald-600 font-light mt-1">{testimonial.industry}</div>
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none mt-2">
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
              { number: "40%", label: "Average Revenue Increase" },
              { number: "85%", label: "Reduction in Missed Calls" },
              { number: "60%", label: "Staff Efficiency Gain" },
              { number: "200%", label: "Booking Conversion Rate" }
            ].map((stat, index) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">{stat.number}</div>
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
                Simple <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Setup Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Get your AI voice receptionist up and running in just 48 hours
              </p>
            </m.div>
          </div>
          
          <div className="space-y-32">
            {[
              {
                number: "01",
                title: "Business Analysis & Setup",
                description: "We analyze your current services, pricing, and call patterns to customize the AI for your specific business needs and customer flow.",
                icon: <Award className="h-8 w-8" />,
                features: [
                  "Service catalog integration",
                  "Pricing structure setup", 
                  "Call flow mapping",
                  "Staff availability sync"
                ]
              },
              {
                number: "02",
                title: "AI Training & Integration", 
                description: "Your AI receptionist learns your brand voice, service protocols, and customer communication style for seamless integration.",
                icon: <Bot className="h-8 w-8" />,
                features: [
                  "Brand voice customization",
                  "Service consultation scripts",
                  "Booking system integration", 
                  "Staff workflow alignment"
                ]
              },
              {
                number: "03",
                title: "Launch & Optimization",
                description: "Go live with 24/7 call handling capabilities and continuous optimization based on customer interactions and booking patterns.",
                icon: <TrendingUp className="h-8 w-8" />,
                features: [
                  "24/7 call handling activation",
                  "Performance monitoring",
                  "Continuous AI improvement",
                  "ROI tracking & reporting"
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
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
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
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
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
              Ready to Transform Your <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Business</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
              Join hundreds of businesses already using AI to boost bookings, improve customer experience, and increase revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 font-light px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Book Your Demo
              </Button>
              <Button 
                onClick={() => setIsContactOpen(true)}
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-light transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Get Custom Quote
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
                <h3 className="text-3xl font-bold text-white mb-2">Get Your Custom Voice AI Solution</h3>
                <p className="text-gray-300">Tell us about your business and we'll create a tailored voice receptionist</p>
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
                <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Request Sent!</h4>
                <p className="text-gray-300">We'll analyze your business needs and get back to you within 24 hours with a custom proposal.</p>
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                      placeholder="your@spa.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Business Name</label>
                    <Input
                      value={contactForm.company}
                      onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                      placeholder="Your business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Phone</label>
                    <Input
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Monthly Calls</label>
                    <select
                      value={contactForm.monthlyCalls}
                      onChange={(e) => setContactForm(prev => ({ ...prev, monthlyCalls: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                    >
                      <option value="">How many calls/month?</option>
                      <option value="0-100">0-100 calls</option>
                      <option value="100-500">100-500 calls</option>
                      <option value="500-1000">500-1000 calls</option>
                      <option value="1000-2000">1000-2000 calls</option>
                      <option value="2000+">2000+ calls</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Locations</label>
                    <select
                      value={contactForm.locations}
                      onChange={(e) => setContactForm(prev => ({ ...prev, locations: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                    >
                      <option value="">Number of locations</option>
                      <option value="1">Single location</option>
                      <option value="2-3">2-3 locations</option>
                      <option value="4-10">4-10 locations</option>
                      <option value="10+">10+ locations</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Industry</label>
                  <Input
                    value={contactForm.industry}
                    onChange={(e) => setContactForm(prev => ({ ...prev, industry: e.target.value }))}
                    className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="e.g. Auto Body, HVAC, Dental, Legal, Spa, etc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Current Phone System</label>
                  <Input
                    value={contactForm.currentSystem}
                    onChange={(e) => setContactForm(prev => ({ ...prev, currentSystem: e.target.value }))}
                    className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="e.g. Traditional phone, answering service, voicemail, etc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">What's your biggest phone/booking challenge? *</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="bg-slate-800/60 border-slate-600/60 text-white rounded-xl px-4 py-3 backdrop-blur-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200 resize-none"
                    placeholder="e.g. Missed calls after hours, staff spending too much time on phone, customers not booking, difficulty explaining services over phone, emergency calls going to voicemail..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 font-semibold py-4 h-14 rounded-xl shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      Analyzing Your Needs...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Get My Custom Voice AI Solution
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
              © 2024 Aethon. Voice AI Solutions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
