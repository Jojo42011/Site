"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agency: "",
    website: "",
    services: "",
    clients: "",
    interest: "",
    model: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Premium purple background designs */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-black">Become a</span>{" "}
              <span className="gradient-text">Partner</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Apply for partnership or request a template. Tell us about your agency and what you&apos;re looking to build.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center premium-shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">Application Received!</h2>
              <p className="text-gray-600 text-lg mb-8">
                We&apos;ll review your application and get back to you within 24-48 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", agency: "", website: "", services: "", clients: "", interest: "", model: "" });
                }}
                className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all premium-shadow"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 sm:p-12 premium-shadow-lg border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black placeholder-gray-400"
                      placeholder="john@agency.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="agency" className="block text-sm font-semibold text-gray-900 mb-2">
                      Agency Name *
                    </label>
                    <input
                      type="text"
                      id="agency"
                      name="agency"
                      required
                      value={formData.agency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black placeholder-gray-400"
                      placeholder="Your Agency LLC"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black placeholder-gray-400"
                      placeholder="https://youragency.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="services" className="block text-sm font-semibold text-gray-900 mb-2">
                    Current Services Offered *
                  </label>
                  <input
                    type="text"
                    id="services"
                    name="services"
                    required
                    value={formData.services}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black placeholder-gray-400"
                    placeholder="Marketing, AI automation, lead gen, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="clients" className="block text-sm font-semibold text-gray-900 mb-2">
                      How Many Clients Do You Serve?
                    </label>
                    <select
                      id="clients"
                      name="clients"
                      value={formData.clients}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black"
                    >
                      <option value="">Select...</option>
                      <option value="1-5">1-5 clients</option>
                      <option value="6-15">6-15 clients</option>
                      <option value="16-30">16-30 clients</option>
                      <option value="30+">30+ clients</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="model" className="block text-sm font-semibold text-gray-900 mb-2">
                      Preferred Model *
                    </label>
                    <select
                      id="model"
                      name="model"
                      required
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black"
                    >
                      <option value="">Select...</option>
                      <option value="templates">Templates (one-time purchase)</option>
                      <option value="partnership">Full Partnership (custom builds)</option>
                      <option value="both">Both / Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold text-gray-900 mb-2">
                    What Automations Are You Interested In Offering? *
                  </label>
                  <textarea
                    id="interest"
                    name="interest"
                    rows={4}
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 transition-all bg-white text-black placeholder-gray-400 resize-none"
                    placeholder="Outbound sales agents, inbound booking, follow-up systems, etc. Any specific use cases for your clients?"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all premium-shadow-lg hover:premium-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  We&apos;ll review your application and get back to you within 24-48 hours.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
