"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Calculator, Info, ChevronDown, ChevronUp } from "lucide-react";

// Real API pricing data (as of 2024)
const apiPricing = {
  "openai-gpt4": {
    name: "OpenAI GPT-4",
    inputCost: 30, // per 1M tokens
    outputCost: 60, // per 1M tokens
    avgCostPer1M: 45,
  },
  "openai-gpt4-turbo": {
    name: "OpenAI GPT-4 Turbo",
    inputCost: 10,
    outputCost: 30,
    avgCostPer1M: 20,
  },
  "anthropic-claude": {
    name: "Anthropic Claude 3.5 Sonnet",
    inputCost: 3,
    outputCost: 15,
    avgCostPer1M: 9,
  },
  "google-gemini": {
    name: "Google Gemini Pro",
    inputCost: 0.5,
    outputCost: 1.5,
    avgCostPer1M: 1,
  },
};

// Aethon models (self-hosted costs)
const aethonPricing = {
  "llama-3.1-70b": {
    name: "Llama 3.1 70B",
    costPer1M: 0.15, // Approximate compute cost
    quality: "GPT-4 quality",
  },
  "deepseek-v2": {
    name: "DeepSeek V2",
    costPer1M: 0.12,
    quality: "Best cost/performance",
  },
  "mixtral-8x22b": {
    name: "Mixtral 8x22B",
    costPer1M: 0.18,
    quality: "Production ready",
  },
};

export default function APICostCalculator() {
  const [monthlyTokens, setMonthlyTokens] = useState(10000000); // 10M tokens default
  const [currentProvider, setCurrentProvider] = useState("openai-gpt4");
  const [selectedModel, setSelectedModel] = useState("llama-3.1-70b");
  const [showDetails, setShowDetails] = useState(false);

  const currentAPI = apiPricing[currentProvider as keyof typeof apiPricing];
  const aethonModel = aethonPricing[selectedModel as keyof typeof aethonPricing];

  // Calculate costs
  const currentMonthlyCost = Math.round((monthlyTokens / 1000000) * currentAPI.avgCostPer1M);
  const aethonMonthlyCost = Math.round((monthlyTokens / 1000000) * aethonModel.costPer1M);
  const monthlySavings = currentMonthlyCost - aethonMonthlyCost;
  const savingsRate = currentMonthlyCost > 0 ? (monthlySavings / currentMonthlyCost) * 100 : 0;
  const annualSavings = monthlySavings * 12;

  // Setup cost
  const setupCost = currentMonthlyCost > 20000 ? 7500 : currentMonthlyCost > 5000 ? 5000 : 2500;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(setupCost / monthlySavings) : 0;

  return (
    <section id="calculator" className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {/* Premium luxurious purple background designs */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl opacity-25" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black mb-6 premium-shadow">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Calculate Your Savings</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compare real API costs vs. self-hosted models. See exactly why Aethon saves 85-95% on AI infrastructure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 space-y-6 premium-border premium-shadow-lg"
          >
            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                Monthly Token Usage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={monthlyTokens}
                  onChange={(e) => setMonthlyTokens(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-4 pr-4 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl text-black text-2xl font-bold focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                  placeholder="10000000"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  tokens
                </div>
              </div>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={monthlyTokens}
                onChange={(e) => setMonthlyTokens(parseInt(e.target.value))}
                className="w-full mt-4 accent-black"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1M</span>
                <span>100M</span>
              </div>
            </div>

            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                Current Cloud Provider
              </label>
              <select
                value={currentProvider}
                onChange={(e) => setCurrentProvider(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black font-semibold focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition-all cursor-pointer"
              >
                {Object.entries(apiPricing).map(([key, api]) => (
                  <option key={key} value={key} className="bg-white">
                    {api.name} (${api.avgCostPer1M}/1M tokens)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                Aethon Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black font-semibold focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition-all cursor-pointer"
              >
                {Object.entries(aethonPricing).map(([key, model]) => (
                  <option key={key} value={key} className="bg-white">
                    {model.name} - {model.quality} (${model.costPer1M}/1M tokens)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
            >
              <span className="text-sm font-semibold text-black flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Why Aethon Saves More
              </span>
              {showDetails ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 space-y-4"
              >
                <h4 className="font-bold text-black mb-3">Why Our Models Save 85-95%</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-black mb-1">1. No Cloud Markup</div>
                    <div className="text-gray-600">
                      Cloud providers charge $3-60 per 1M tokens. Actual compute cost is $0.10-0.20. 
                      You keep the difference.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-black mb-1">2. Open Source Models</div>
                    <div className="text-gray-600">
                      Llama 3.1 70B matches GPT-4 quality. DeepSeek V2 offers best cost/performance. 
                      Zero licensing fees.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-black mb-1">3. Your Infrastructure</div>
                    <div className="text-gray-600">
                      $500/mo server handles what costs $10K+ on cloud APIs. Scale by adding servers, 
                      not API credits.
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-black mb-1">4. No Rate Limits</div>
                    <div className="text-gray-600">
                      Unlimited requests. No throttling. No surprise bills. Complete control over 
                      your AI infrastructure.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Cost Comparison */}
            <div className="bg-white rounded-3xl p-8 premium-border premium-shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Monthly Cost Comparison</h3>
                <TrendingDown className="w-6 h-6 text-black" />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Current ({currentAPI.name})</span>
                    <span className="text-gray-400 font-bold text-2xl line-through">
                      ${currentMonthlyCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    ${currentAPI.avgCostPer1M}/1M tokens × {(monthlyTokens / 1000000).toFixed(1)}M tokens
                  </div>
                </div>
                <div className="bg-black rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">With Aethon ({aethonModel.name})</span>
                    <span className="text-white font-bold text-3xl">
                      ${aethonMonthlyCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300">
                    ${aethonModel.costPer1M}/1M tokens × {(monthlyTokens / 1000000).toFixed(1)}M tokens
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 premium-shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-black">Monthly Savings</h3>
              </div>
              <div className="text-black font-bold text-5xl mb-2">
                ${monthlySavings.toLocaleString()}
              </div>
              <div className="text-gray-700 font-semibold text-lg mb-1">
                {savingsRate.toFixed(1)}% cost reduction
              </div>
              <div className="text-gray-600 text-sm">
                ${annualSavings.toLocaleString()} saved annually
              </div>
            </div>

          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-600 mb-8 font-medium">
            Ready to cut your AI bills by {savingsRate.toFixed(1)}%?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-10 py-5 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all premium-shadow-lg hover:premium-shadow"
            >
              Get Free Savings Audit
            </a>
            <a
              href="/products"
              className="px-10 py-5 border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all"
            >
              See our Products
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
