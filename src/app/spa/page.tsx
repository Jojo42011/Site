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
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

// Med Spa AI Receptionist Capabilities
const medSpaCapabilities = [
  {
    category: "24/7 Appointment Booking",
    icon: <Calendar className="h-6 w-6" />,
    savings: "85% reduction in missed calls",
    description: "Never miss a booking opportunity with round-the-clock appointment scheduling and instant confirmations",
    features: ["Real-time availability", "Automated reminders", "Waitlist management", "Multi-location support"]
  },
  {
    category: "Treatment Consultation",
    icon: <Headphones className="h-6 w-6" />,
    savings: "60% faster intake process", 
    description: "Intelligent pre-consultation screening and treatment recommendations based on client needs",
    features: ["Treatment matching", "Pricing information", "Preparation instructions", "Contraindication screening"]
  },
  {
    category: "Client Retention & Follow-up",
    icon: <Heart className="h-6 w-6" />,
    savings: "40% increase in retention",
    description: "Automated post-treatment care, satisfaction surveys, and personalized follow-up sequences",
    features: ["Post-care instructions", "Progress check-ins", "Loyalty program management", "Review requests"]
  },
  {
    category: "Payment & Package Sales",
    icon: <DollarSign className="h-6 w-6" />,
    savings: "35% increase in package sales",
    description: "Seamless payment processing and intelligent upselling of treatment packages and memberships",
    features: ["Payment collection", "Package recommendations", "Membership enrollment", "Financing options"]
  },
  {
    category: "Staff Coordination",
    icon: <Users className="h-6 w-6" />,
    savings: "50% reduction in admin tasks",
    description: "Streamlined staff scheduling, client handoffs, and internal communication management",
    features: ["Provider matching", "Schedule optimization", "Client notes sharing", "Task automation"]
  },
  {
    category: "Compliance & Documentation",
    icon: <ShieldCheck className="h-6 w-6" />,
    savings: "100% HIPAA compliant",
    description: "Automated consent forms, medical history collection, and secure documentation management",
    features: ["Digital consent forms", "Medical history intake", "Photo documentation", "Secure file storage"]
  }
];

const medSpaStats = [
  {
    number: "$15.9B",
    label: "Med Spa Market Size 2024",
    growth: "+15.2% annually"
  },
  {
    number: "73%",
    label: "Clients Prefer Online Booking",
    growth: "Up from 45% in 2020"
  },
  {
    number: "42%",
    label: "Revenue Lost to Missed Calls",
    growth: "Industry average"
  },
  {
    number: "68%",
    label: "Clients Want 24/7 Support",
    growth: "Post-pandemic shift"
  }
];

const medSpaTestimonials = [
  {
    name: "Dr. Amanda Richardson",
    company: "Serenity Medical Spa",
    role: "Medical Director",
    content: "Since implementing Aethon's AI receptionist, we've seen a 200% increase in bookings. The AI converts 3x more phone inquiries into actual appointments than our human staff ever did. It never sleeps, never takes breaks, and always gives perfect treatment explanations.",
    savings: "200% booking increase",
    treatments: "Botox, Fillers, Laser Hair Removal"
  },
  {
    name: "Marcus Thompson", 
    company: "Bliss Day Spa",
    role: "Owner",
    content: "We were losing $15,000 monthly from missed calls alone. Now our AI captures every single inquiry, books appointments instantly, and even upsells massage packages. Our revenue jumped 40% in just 2 months with zero additional staff costs.",
    savings: "85% conversion rate",
    treatments: "Massage Therapy, Facials, Body Treatments"
  },
  {
    name: "Isabella Martinez",
    company: "Rejuvenate Wellness Center", 
    role: "Practice Manager",
    content: "The AI is like having our best receptionist working 24/7. It pre-qualifies clients, explains our IV therapy and wellness programs perfectly, and has eliminated our no-show problem completely. Our consultation-to-treatment conversion rate hit 92%.",
    savings: "60% staff efficiency gain",
    treatments: "IV Therapy, Wellness Consultations, Hormone Therapy"
  }
];

const treatmentCategories = [
  "Massage Therapy", "Facial Treatments", "Botox & Fillers", "Laser Hair Removal", 
  "CoolSculpting", "HydraFacial", "Chemical Peels", "Microneedling", 
  "Body Wraps", "Aromatherapy", "Hot Stone Therapy", "Deep Tissue Massage",
  "IPL Photofacial", "Body Contouring", "IV Therapy", "Acne Treatment"
];

export default function MedSpaLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    treatments: "",
    locations: "",
    message: "",
    monthlyBookings: "",
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
        treatments: "",
        locations: "",
        message: "",
        monthlyBookings: "",
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
      
      {/* Floating Elements with Med Spa Theme */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/3 to-teal-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      
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
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-semibold shadow-lg shadow-pink-500/20 transition-all duration-200 hover:scale-105"
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
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Spa Booking Again
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Transform your spa, wellness center, or medical practice with an AI receptionist that books appointments 24/7, pre-qualifies clients, and increases your revenue by 40% while your staff focuses on treatments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button 
                  onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-light px-8 py-4 text-lg shadow-xl shadow-pink-500/25 transition-all duration-200 hover:scale-105"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  See Live Demo
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

              {/* Industry Stats */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {medSpaStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">{stat.number}</div>
                    <div className="text-sm text-gray-300 font-light mb-1">{stat.label}</div>
                    <div className="text-xs text-pink-400 font-light">{stat.growth}</div>
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
                Everything Your <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Spa Business Needs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Built for spas, wellness centers, massage parlors, medical spas, and aesthetic clinics
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medSpaCapabilities.map((capability, index) => (
              <m.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 hover:border-pink-300 transition-all duration-300 hover:shadow-xl group shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:from-pink-600 group-hover:to-purple-700 transition-colors">
                        <div className="text-white">
                          {capability.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-black text-xl font-light tracking-tight">{capability.category}</CardTitle>
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none mt-1">
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
                          <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>

          {/* Treatment Categories */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-8">Supports All Popular Spa & Wellness Treatments</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {treatmentCategories.map((treatment, index) => (
                <Badge key={index} variant="outline" className="text-gray-700 border-gray-300 hover:border-pink-400 hover:text-pink-600 transition-colors">
                  {treatment}
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
                Real <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Med Spa Results</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                See how med spas are transforming their business with our AI receptionist
              </p>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {medSpaTestimonials.map((testimonial, index) => (
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
                        <Star key={i} className="h-4 w-4 fill-pink-400 text-pink-400" />
                      ))}
                    </div>
                    <p className="text-black mb-6 leading-relaxed font-light">"{testimonial.content}"</p>
                    <div className="border-t border-gray-300 pt-6">
                      <div className="font-light text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.role}</div>
                      <div className="text-sm text-gray-600 font-light">{testimonial.company}</div>
                      <div className="text-xs text-pink-600 font-light mt-1">{testimonial.treatments}</div>
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none mt-2">
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
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">{stat.number}</div>
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
                Simple <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Setup Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Get your AI receptionist up and running in just 48 hours
              </p>
            </m.div>
          </div>
          
          <div className="space-y-32">
            {[
              {
                number: "01",
                title: "Treatment Menu Analysis",
                description: "We analyze your current services, pricing, and booking patterns to customize the AI for your specific treatments and client flow.",
                icon: <Award className="h-8 w-8" />,
                features: [
                  "Service catalog integration",
                  "Pricing structure setup", 
                  "Treatment duration mapping",
                  "Provider availability sync"
                ]
              },
              {
                number: "02",
                title: "AI Training & Integration", 
                description: "Your AI receptionist learns your brand voice, treatment protocols, and client communication style for seamless integration.",
                icon: <Bot className="h-8 w-8" />,
                features: [
                  "Brand voice customization",
                  "Treatment consultation scripts",
                  "Booking system integration", 
                  "Staff workflow alignment"
                ]
              },
              {
                number: "03",
                title: "Launch & Optimization",
                description: "Go live with 24/7 booking capabilities and continuous optimization based on client interactions and booking patterns.",
                icon: <TrendingUp className="h-8 w-8" />,
                features: [
                  "24/7 booking activation",
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
                    <div className="w-32 h-32 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
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
                        <CheckCircle2 className="h-5 w-5 text-pink-500 flex-shrink-0" />
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
              Ready to Transform Your <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Med Spa</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light">
              Join hundreds of med spas already using AI to boost bookings, improve client experience, and increase revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://calendly.com/aethonintelligence/15-minute-demo-of-ai-systems', '_blank')}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-light px-8 py-4 text-lg transition-all duration-200 hover:scale-105"
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
                <h3 className="text-3xl font-bold text-white mb-2">Get Your Custom Spa AI Solution</h3>
                <p className="text-gray-300">Tell us about your business and we'll create a tailored solution</p>
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
                <CheckCircle2 className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Request Sent!</h4>
                <p className="text-gray-300">We'll analyze your med spa needs and get back to you within 24 hours with a custom proposal.</p>
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
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
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
                      placeholder="Your spa/wellness center name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Phone</label>
                    <Input
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Monthly Bookings</label>
                    <select
                      value={contactForm.monthlyBookings}
                      onChange={(e) => setContactForm(prev => ({ ...prev, monthlyBookings: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
                    >
                      <option value="">How many appointments/month?</option>
                      <option value="0-100">0-100 appointments</option>
                      <option value="100-300">100-300 appointments</option>
                      <option value="300-500">300-500 appointments</option>
                      <option value="500-1000">500-1000 appointments</option>
                      <option value="1000+">1000+ appointments</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white mb-3">Locations</label>
                    <select
                      value={contactForm.locations}
                      onChange={(e) => setContactForm(prev => ({ ...prev, locations: e.target.value }))}
                      className="w-full bg-slate-800/60 border border-slate-600/60 text-white rounded-xl px-4 py-3 h-12 backdrop-blur-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
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
                  <label className="block text-sm font-semibold text-white mb-3">Top Treatments</label>
                  <Input
                    value={contactForm.treatments}
                    onChange={(e) => setContactForm(prev => ({ ...prev, treatments: e.target.value }))}
                    className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
                    placeholder="e.g. Botox, Fillers, Laser Hair Removal, CoolSculpting"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Current Booking System</label>
                  <Input
                    value={contactForm.currentSystem}
                    onChange={(e) => setContactForm(prev => ({ ...prev, currentSystem: e.target.value }))}
                    className="bg-slate-800/60 border-slate-600/60 text-white backdrop-blur-sm h-12 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200"
                    placeholder="e.g. Acuity, Schedulicity, phone calls, etc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">What's your biggest booking challenge? *</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="bg-slate-800/60 border-slate-600/60 text-white rounded-xl px-4 py-3 backdrop-blur-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 resize-none"
                    placeholder="e.g. Missed calls after hours, staff spending too much time on phone, clients not showing up, difficulty explaining treatments over phone..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-semibold py-4 h-14 rounded-xl shadow-xl shadow-pink-500/25 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      Analyzing Your Needs...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Get My Custom AI Solution
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
              © 2024 Aethon. Spa & Wellness AI Solutions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
