"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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

const aiTools = [
  "ChatGPT",
  "Claude",
  "GitHub Copilot",
  "Microsoft Copilot",
  "Google Gemini",
  "Custom internal models",
  "Other",
  "None yet, evaluating",
];

const dataTypes = [
  "Patient health information (PHI)",
  "Financial records",
  "Legal documents",
  "Classified information",
  "Trade secrets/IP",
  "Customer PII",
  "None of the above",
];

const regulations = [
  "HIPAA",
  "SOC 2",
  "GDPR",
  "CCPA",
  "FedRAMP",
  "CMMC",
  "None",
  "Unsure",
];

const monitoringOptions = [
  "Comprehensive monitoring system",
  "Basic logging",
  "IT department oversight",
  "Honor system/no monitoring",
  "Unsure",
];

const deploymentOptions = [
  "Public cloud (OpenAI, Anthropic, etc.)",
  "Private cloud",
  "On-premise",
  "Hybrid",
  "Not deployed yet",
];

interface FormData {
  industry: string;
  companySize: string;
  usingAI: string;
  aiTools: string[];
  dataTypes: string[];
  employeeAccess: string;
  policies: string;
  monitoring: string;
  incidents: string;
  regulations: string[];
  riskAssessment: string;
  dpo: string;
  compliant: string;
  deployment: string;
  email: string;
  name: string;
  company: string;
}

export default function RiskAssessmentPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    companySize: "",
    usingAI: "",
    aiTools: [],
    dataTypes: [],
    employeeAccess: "",
    policies: "",
    monitoring: "",
    incidents: "",
    regulations: [],
    riskAssessment: "",
    dpo: "",
    compliant: "",
    deployment: "",
    email: "",
    name: "",
    company: "",
  });
  const [showResults, setShowResults] = useState(false);

  const calculateRiskScore = () => {
    let score = 0;
    const maxScore = 100;

    // Data sensitivity
    if (formData.dataTypes.length > 3) score += 25;
    else if (formData.dataTypes.length > 1) score += 15;
    else if (formData.dataTypes.length === 1 && formData.dataTypes[0] !== "None of the above") score += 10;

    // Employee access
    if (formData.employeeAccess === "Yes") score += 20;
    else if (formData.employeeAccess === "Unsure") score += 15;

    // Policies
    if (formData.policies === "No") score += 15;
    else if (formData.policies === "In Development") score += 8;

    // Monitoring
    if (formData.monitoring === "Honor system/no monitoring") score += 20;
    else if (formData.monitoring === "Unsure") score += 15;
    else if (formData.monitoring === "Basic logging") score += 10;

    // Past incidents
    if (formData.incidents === "Yes") score += 15;

    // Risk assessment done
    if (formData.riskAssessment === "No") score += 10;

    // DPO
    if (formData.dpo === "No") score += 5;

    // Compliance
    if (formData.compliant === "No" || formData.compliant === "Unsure") score += 10;

    // Deployment
    if (formData.deployment === "Public cloud (OpenAI, Anthropic, etc.)") score += 15;

    return Math.min(score, maxScore);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "High", color: "text-red-500", bg: "bg-red-500" };
    if (score >= 40) return { level: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { level: "Low", color: "text-green-500", bg: "bg-green-500" };
  };

  const handleMultiSelect = (field: keyof FormData, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter((v) => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const steps = [
    {
      title: "Organization Profile",
      questions: [
        {
          label: "What industry is your organization in?",
          type: "select",
          field: "industry" as keyof FormData,
          options: industries,
        },
        {
          label: "What is your company size?",
          type: "select",
          field: "companySize" as keyof FormData,
          options: companySizes,
        },
        {
          label: "Are you currently using AI tools?",
          type: "radio",
          field: "usingAI" as keyof FormData,
          options: ["Yes", "No"],
        },
        {
          label: "Which AI tools are you using?",
          type: "multiselect",
          field: "aiTools" as keyof FormData,
          options: aiTools,
        },
      ],
    },
    {
      title: "Data Sensitivity",
      questions: [
        {
          label: "What type of sensitive data does your organization handle?",
          type: "multiselect",
          field: "dataTypes" as keyof FormData,
          options: dataTypes,
        },
        {
          label: "Do employees have access to AI tools with this sensitive data?",
          type: "radio",
          field: "employeeAccess" as keyof FormData,
          options: ["Yes", "No", "Unsure"],
        },
        {
          label: "Do you have policies restricting what data can be entered into AI tools?",
          type: "radio",
          field: "policies" as keyof FormData,
          options: ["Yes", "No", "In Development"],
        },
        {
          label: "How is employee AI usage monitored?",
          type: "select",
          field: "monitoring" as keyof FormData,
          options: monitoringOptions,
        },
        {
          label: "Have you experienced any data leaks or security incidents in the past 2 years?",
          type: "radio",
          field: "incidents" as keyof FormData,
          options: ["Yes", "No", "Prefer not to say"],
        },
      ],
    },
    {
      title: "Compliance Requirements",
      questions: [
        {
          label: "Which regulations apply to your organization?",
          type: "multiselect",
          field: "regulations" as keyof FormData,
          options: regulations,
        },
        {
          label: "Have you completed a formal AI risk assessment?",
          type: "radio",
          field: "riskAssessment" as keyof FormData,
          options: ["Yes", "No", "In Progress"],
        },
        {
          label: "Do you have a Data Privacy Officer or equivalent role?",
          type: "radio",
          field: "dpo" as keyof FormData,
          options: ["Yes", "No"],
        },
        {
          label: "Are your AI tools compliant with your industry regulations?",
          type: "radio",
          field: "compliant" as keyof FormData,
          options: ["Yes", "No", "Unsure"],
        },
      ],
    },
    {
      title: "Current Infrastructure",
      questions: [
        {
          label: "Where are your AI models deployed?",
          type: "select",
          field: "deployment" as keyof FormData,
          options: deploymentOptions,
        },
      ],
    },
    {
      title: "Get Your Results",
      questions: [
        {
          label: "Your Name",
          type: "text",
          field: "name" as keyof FormData,
          options: [],
        },
        {
          label: "Work Email",
          type: "email",
          field: "email" as keyof FormData,
          options: [],
        },
        {
          label: "Company Name",
          type: "text",
          field: "company" as keyof FormData,
          options: [],
        },
      ],
    },
  ];

  const currentStep = steps[step];
  const riskScore = calculateRiskScore();
  const riskLevel = getRiskLevel(riskScore);

  if (showResults) {
    return (
      <main className="relative min-h-screen">
        <Navigation />

        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-8 sm:p-12 text-center"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                Your AI Privacy Risk Score
              </h1>

              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-charcoal-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={553}
                    strokeDashoffset={553 - (553 * riskScore) / 100}
                    className={riskLevel.color}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${riskLevel.color}`}>{riskScore}</span>
                  <span className="text-gray-400">out of 100</span>
                </div>
              </div>

              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${riskLevel.bg}/20 mb-6`}>
                {riskScore >= 70 ? (
                  <AlertTriangle className={`w-5 h-5 ${riskLevel.color}`} />
                ) : riskScore >= 40 ? (
                  <Shield className={`w-5 h-5 ${riskLevel.color}`} />
                ) : (
                  <CheckCircle className={`w-5 h-5 ${riskLevel.color}`} />
                )}
                <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.level} Risk</span>
              </div>

              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                {riskScore >= 70
                  ? "Your organization has significant AI privacy vulnerabilities that need immediate attention. We recommend scheduling a comprehensive assessment."
                  : riskScore >= 40
                  ? "Your organization has moderate AI privacy risks. There are opportunities to strengthen your data protection practices."
                  : "Your organization has relatively low AI privacy risk, but there may still be areas for improvement."}
              </p>

              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="block w-full py-4 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform glow-purple"
                >
                  Schedule a Free Consultation
                </Link>
                <Link
                  href="/ai-privacy-checklist"
                  className="block w-full py-4 border border-purple-glow/30 rounded-xl font-semibold text-white hover:border-purple-glow/60 transition-colors"
                >
                  Download AI Privacy Checklist
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero Section */}
      {step === 0 && (
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">What&apos;s Your</span>{" "}
              <span className="gradient-text">AI Privacy Risk Score?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              5-minute assessment to identify your data exposure risks
            </motion.p>
          </div>
        </section>
      )}

      {/* Assessment Form */}
      <section className="relative py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Step {step + 1} of {steps.length}</span>
              <span className="text-sm text-gray-400">{currentStep.title}</span>
            </div>
            <div className="w-full h-2 bg-charcoal-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-glow to-blue-electric rounded-full transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">{currentStep.title}</h2>

            <div className="space-y-6">
              {currentStep.questions.map((q) => (
                <div key={q.field}>
                  <label className="block text-gray-300 mb-3">{q.label}</label>

                  {q.type === "select" && (
                    <select
                      value={formData[q.field] as string}
                      onChange={(e) => setFormData({ ...formData, [q.field]: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white"
                    >
                      <option value="">Select...</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {q.type === "radio" && (
                    <div className="flex flex-wrap gap-3">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, [q.field]: opt })}
                          className={`px-4 py-2 rounded-lg border transition-all ${
                            formData[q.field] === opt
                              ? "border-purple-glow bg-purple-glow/20 text-white"
                              : "border-purple-glow/30 text-gray-300 hover:border-purple-glow/60"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "multiselect" && (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleMultiSelect(q.field, opt)}
                          className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                            (formData[q.field] as string[]).includes(opt)
                              ? "border-purple-glow bg-purple-glow/20 text-white"
                              : "border-purple-glow/30 text-gray-300 hover:border-purple-glow/60"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {(q.type === "text" || q.type === "email") && (
                    <input
                      type={q.type}
                      value={formData[q.field] as string}
                      onChange={(e) => setFormData({ ...formData, [q.field]: e.target.value })}
                      className="w-full px-4 py-3 bg-charcoal-900/50 border border-purple-glow/30 rounded-lg focus:outline-none focus:border-purple-glow text-white"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-glow to-blue-electric rounded-xl font-semibold text-white hover:scale-105 transition-transform glow-purple"
                >
                  <span>Get My Risk Score</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

