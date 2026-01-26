"use client";

import { motion } from "framer-motion";
import { Calendar, MessageSquare, CreditCard, BarChart3, Database, Webhook } from "lucide-react";

const featuredIntegrations = [
  {
    name: "Twilio",
    category: "Communication",
    icon: MessageSquare,
    color: "text-red-600",
  },
  {
    name: "Google Calendar",
    category: "Calendar",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    name: "HubSpot",
    category: "CRM",
    icon: BarChart3,
    color: "text-orange-600",
  },
  {
    name: "Salesforce",
    category: "CRM",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    name: "Stripe",
    category: "Payment",
    icon: CreditCard,
    color: "text-indigo-600",
  },
  {
    name: "Meta Ads",
    category: "Lead Source",
    icon: Webhook,
    color: "text-blue-700",
  },
];

const integrationCategories = [
  {
    title: "Calendars",
    count: 4,
    items: ["Google Calendar", "Outlook Calendar", "Calendly", "Cal.com"],
  },
  {
    title: "CRMs",
    count: 6,
    items: ["HubSpot", "Salesforce", "Pipedrive", "GoHighLevel", "Custom CRM APIs"],
  },
  {
    title: "Communication",
    count: 4,
    items: ["Twilio", "WhatsApp Business", "Slack", "Email (SMTP)"],
  },
  {
    title: "Payment Processing",
    count: 3,
    items: ["Stripe", "Square", "PayPal", "Custom payment gateways"],
  },
  {
    title: "Lead Sources",
    count: 4,
    items: ["Meta Ads", "Google Ads", "Webhooks", "Custom APIs"],
  },
  {
    title: "Automation & Data",
    count: 4,
    items: ["Airtable", "Google Sheets", "PostgreSQL/MySQL", "REST APIs", "Webhooks"],
  },
];

const totalIntegrations = integrationCategories.reduce((sum, cat) => sum + cat.count, 0);

export default function Integrations() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-100/20 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-black leading-tight">
            <span className="gradient-text">25+ Integrations</span> Built-In
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with the tools your clients already use. No Zapier, no n8n—everything configured in one dashboard.
          </p>
        </motion.div>

        {/* Featured Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {featuredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 premium-shadow hover:premium-shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col items-center justify-center group"
              >
                <integration.icon className={`w-8 h-8 ${integration.color} mb-3 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-semibold text-gray-900 text-center">{integration.name}</span>
                <span className="text-xs text-gray-500 mt-1">{integration.category}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 sm:p-12 premium-shadow border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-l-4 border-purple-500 pl-6"
              >
                <h3 className="text-xl font-bold text-black mb-3">{category.title}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {category.items.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {category.items.length > 3 && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{category.items.length - 3} more
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-gray-600">
              <span className="font-semibold text-black">Custom integrations available.</span> Need something specific? We can integrate with any REST API or webhook.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
