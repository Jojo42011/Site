"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Download, Shield, CheckCircle, FileText, Lock, Users } from "lucide-react";
import { useState } from "react";

const checklistPreview = [
  {
    category: "Data Sovereignty",
    count: 12,
    questions: [
      "Where is training data physically stored?",
      "What jurisdiction governs data processing?",
      "Can data be deleted on demand?",
      "Who has access to your raw data?",
    ],
  },
  {
    category: "Vendor Security",
    count: 10,
    questions: [
      "What certifications does the vendor hold?",
      "Who has access to your data?",
      "What encryption standards are used?",
      "How are security incidents handled?",
    ],
  },
  {
    category: "Compliance",
    count: 8,
    questions: [
      "Does this meet HIPAA requirements?",
      "How is GDPR compliance maintained?",
      "What audit trails exist?",
      "Are there data retention policies?",
    ],
  },
  {
    category: "Risk Assessment",
    count: 9,
    questions: [
      "What happens if the vendor is breached?",
      "Is there a data recovery plan?",
      "How is model bias monitored?",
      "What are the liability terms?",
    ],
  },
  {
    category: "Implementation",
    count: 8,
    questions: [
      "Can the solution run on-premise?",
      "What are the integration requirements?",
      "How is the model updated?",
      "What training is provided?",
    ],
  },
];

const stats = [
  { value: "$4.45M", label: "Average data breach cost (IBM, 2024)" },
  { value: "74%", label: "CEOs cite data security as biggest AI concern" },
  { value: "53%", label: "Organizations identify privacy as #1 AI obstacle" },
];

const industries = [
  "Healthcare",
  "Financial Services",
  "Legal",
  "Government/Defense",
  "Technology",
  "Manufacturing",
  "Other",
];

const companySizes = [
  "50-200 employees",
  "200-1,000 employees",
  "1,000-5,000 employees",
  "5,000+ employees",
];

export default function AIPrivacyChecklistPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    industry: "",
    companySize: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
  };

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-glow rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                The Enterprise AI Privacy Audit Checklist
              </h1>
              <p className="text-xl text-gray-300">
                47 Critical Questions Your Legal & Security Teams Must Ask Before Deploying LLMs
              </p>

              <ul className="space-y-3">
                {[
                  "Data sovereignty assessment framework",
                  "Vendor security evaluation criteria",
                  "Compliance checkpoint matrix",
                  "Risk scoring methodology",
                  "Implementation timeline template",
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-glow flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>Trusted by security professionals</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>100% Free, No Credit Card</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Download className="w-4 h-4" />
                  <span>Instant PDF Download</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-6 sm:p-8"
            >
              {!isSubmitted ? (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <FileText className="w-8 h-8 text-purple-glow" />
                    <h2 className="text-2xl font-bold text-white">Get Your Free Checklist</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">First Name*</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Last Name*</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Work Email*</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Company Name*</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Job Title*</label>
                        <input
                          type="text"
                          required
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Industry*</label>
                        <select
                          required
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                        >
                          <option value="">Select...</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Company Size*</label>
                        <select
                          required
                          value={formData.companySize}
                          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          className="w-full px-4 py-2.5 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white text-sm"
                        >
                          <option value="">Select...</option>
                          {companySizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1"
                      />
                      <span className="text-gray-400 text-sm">
                        I agree to receive occasional emails about AI privacy best practices
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform glow-purple flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Get My Free Checklist</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                  <p className="text-gray-300 mb-6">Check your email for the download link.</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform"
                  >
                    Want a personalized assessment? Book a call
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-charcoal-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Why AI Privacy Matters in 2025
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What&apos;s Inside the Checklist
            </h2>
            <p className="text-gray-300">47 questions across 5 critical categories</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Category Tabs */}
            <div className="space-y-2">
              {checklistPreview.map((cat, index) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    activeCategory === index
                      ? "bg-gradient-to-r from-purple-glow/20 to-blue-electric/20 border border-purple-glow/40"
                      : "glass-effect hover:border-purple-glow/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">{cat.category}</span>
                    <span className="text-purple-glow text-sm">{cat.count} questions</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Questions Preview */}
            <div className="lg:col-span-2 glass-effect rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                {checklistPreview[activeCategory].category} Questions
              </h3>
              <ul className="space-y-4">
                {checklistPreview[activeCategory].questions.map((q) => (
                  <li key={q} className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-purple-glow flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{q}</span>
                  </li>
                ))}
                <li className="flex items-start space-x-3 opacity-50">
                  <Shield className="w-5 h-5 text-purple-glow flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 italic">
                    + {checklistPreview[activeCategory].count - 4} more questions...
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

