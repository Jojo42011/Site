"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Calculator, Zap } from "lucide-react";

export default function APICostCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(10000);
  const [useCase, setUseCase] = useState("customer-support");

  // Cost reduction percentages based on use case
  const savingsRates = {
    "customer-support": 0.85, // 85% savings
    "content-generation": 0.82,
    "code-assistance": 0.88,
    "data-analysis": 0.80,
    "email-automation": 0.87,
  };

  const useCaseLabels = {
    "customer-support": "Customer Support Chatbots",
    "content-generation": "Content Generation",
    "code-assistance": "Code Assistance",
    "data-analysis": "Data Analysis",
    "email-automation": "Email Automation",
  };

  const savingsRate = savingsRates[useCase as keyof typeof savingsRates];
  const newMonthlyCost = Math.round(monthlyBill * (1 - savingsRate));
  const monthlySavings = monthlyBill - newMonthlyCost;
  const annualSavings = monthlySavings * 12;

  // Setup cost (one-time)
  const setupCost = monthlyBill > 20000 ? 7500 : 2500;
  const breakEvenMonths = Math.ceil(setupCost / monthlySavings);

  return (
    <section id="calculator" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Calculate Your Savings</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you could save by switching from cloud APIs to private LLMs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 space-y-6 border border-gray-200 shadow-lg"
          >
            <div>
              <label className="block text-gray-900 font-semibold mb-4">
                Current Monthly API Bill
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-2xl font-bold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                  placeholder="10000"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                className="w-full mt-4 accent-purple-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$1K</span>
                <span>$100K</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-900 font-semibold mb-4">
                Primary Use Case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors cursor-pointer"
              >
                {Object.entries(useCaseLabels).map(([value, label]) => (
                  <option key={value} value={value} className="bg-white">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Cost Reduction Rate</span>
                <span className="text-green-600 font-bold text-lg">
                  {Math.round(savingsRate * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Setup Cost (One-time)</span>
                <span className="text-gray-900 font-semibold">
                  ${setupCost.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Monthly Cost Comparison */}
            <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold">Monthly Cost</h3>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current (Cloud APIs)</span>
                  <span className="text-red-500 font-bold text-xl line-through">
                    ${monthlyBill.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-semibold">With Aethon</span>
                  <span className="text-green-600 font-bold text-3xl">
                    ${newMonthlyCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900 font-semibold">Monthly Savings</h3>
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-green-600 font-bold text-4xl mb-1">
                ${monthlySavings.toLocaleString()}
              </div>
              <div className="text-gray-700 text-sm">
                ${annualSavings.toLocaleString()} saved annually
              </div>
            </div>

            {/* Break-even */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
              <h3 className="text-gray-900 font-semibold mb-3">Break-Even Timeline</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-purple-600 font-bold text-4xl">
                  {breakEvenMonths}
                </span>
                <span className="text-gray-700">
                  {breakEvenMonths === 1 ? "month" : "months"}
                </span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, (2 / breakEvenMonths) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-green-500"
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                ROI achieved in {breakEvenMonths} {breakEvenMonths === 1 ? "month" : "months"} -
                then pure savings every month after
              </p>
            </div>

            {/* 12-Month Projection */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
              <h3 className="text-gray-900 font-semibold mb-3">12-Month Net Savings</h3>
              <div className="text-gray-900 font-bold text-3xl">
                ${(annualSavings - setupCost).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                After deducting ${setupCost.toLocaleString()} setup cost
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-6">
            Ready to cut your AI bills by {Math.round(savingsRate * 100)}%?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-lg text-white hover:scale-105 transition-transform shadow-md hover:shadow-lg"
          >
            Get Your Free Savings Audit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
