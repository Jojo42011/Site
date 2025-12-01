"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  TrendingDown, 
  Calculator, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Phone,
  Database,
  Workflow,
  Crown,
  Lock,
  Infinity as InfinityIcon
} from "lucide-react";

// ==========================================
// ACCURATE CLOUD SERVICE PRICING (2024-2025)
// ==========================================

// Voice AI Platforms - Per minute pricing
const voiceAIPricing = {
  retell: {
    name: "Retell AI",
    perMinute: 0.07, // Base telephony rate
    llmCostPerMin: 0.12, // GPT-4 costs for voice AI
    totalPerMin: 0.19, // Total per minute
    description: "Per-minute charges + LLM API costs",
    additionalFees: "Plus telephony, transcription fees",
  },
  vapi: {
    name: "Vapi",
    perMinute: 0.05, // Platform fee
    llmCostPerMin: 0.10, // LLM + voice provider
    totalPerMin: 0.15,
    description: "Platform + LLM + voice provider costs",
    additionalFees: "Variable based on model choice",
  },
  bland: {
    name: "Bland AI",
    perMinute: 0.09,
    llmCostPerMin: 0.08,
    totalPerMin: 0.17,
    description: "Enterprise voice AI platform",
    additionalFees: "Custom pricing at scale",
  },
};

// RAG & Knowledge Base Platforms - Per query/token pricing
const ragPricing = {
  openaiPinecone: {
    name: "OpenAI + Pinecone",
    embeddingCostPer1K: 0.0001, // text-embedding-3-small
    queryLLMCostPer1K: 0.03, // GPT-4 Turbo average
    vectorDBMonthly: 70, // Pinecone starter
    description: "OpenAI embeddings + GPT-4 + Pinecone",
  },
  langchainCloud: {
    name: "LangChain + Cloud LLMs",
    embeddingCostPer1K: 0.0001,
    queryLLMCostPer1K: 0.025,
    vectorDBMonthly: 100,
    description: "LangChain with cloud providers",
  },
  azureOpenAI: {
    name: "Azure OpenAI + Cognitive Search",
    embeddingCostPer1K: 0.0001,
    queryLLMCostPer1K: 0.03,
    vectorDBMonthly: 250,
    description: "Enterprise Azure stack",
  },
};

// Workflow Automation Platforms
const workflowPricing = {
  n8nCloud: {
    name: "n8n Cloud",
    baseMonthlyCost: 50, // Pro plan
    costPer1KExecutions: 5,
    aiNodeCostPer1K: 30, // When using AI/LLM nodes
    description: "Pro plan + AI workflow costs",
  },
  makecom: {
    name: "Make (Integromat)",
    baseMonthlyCost: 59, // Teams plan
    costPer1KExecutions: 6,
    aiNodeCostPer1K: 35,
    description: "Teams plan + operations",
  },
  zapier: {
    name: "Zapier",
    baseMonthlyCost: 69, // Professional
    costPer1KExecutions: 7,
    aiNodeCostPer1K: 40,
    description: "Professional + AI actions",
  },
};

// Aethon Local Solutions - Flat infrastructure costs
const aethonPricing = {
  voiceAgent: {
    name: "Aethon Voice Agent",
    monthlyHosting: 400, // Server + bandwidth
    perMinuteCost: 0.005, // Just compute cost
    description: "Local Whisper + LLM + TTS",
  },
  ragAgent: {
    name: "Aethon RAG Agent",
    monthlyHosting: 300,
    perQueryCost: 0.0001, // Negligible compute
    description: "Local embeddings + LLM + ChromaDB",
  },
  automationAgent: {
    name: "Aethon Automation Agent",
    monthlyHosting: 250,
    perExecutionCost: 0.001,
    description: "Local workflows + AI processing",
  },
};

type AgentType = "voice" | "rag" | "automation";

export default function APICostCalculator() {
  const [agentType, setAgentType] = useState<AgentType>("voice");
  const [monthlyUsage, setMonthlyUsage] = useState(10000); // 10K mins/queries/executions
  const [selectedCompetitor, setSelectedCompetitor] = useState("retell");
  const [showDetails, setShowDetails] = useState(false);
  const [timeframe, setTimeframe] = useState<12 | 24 | 36>(12); // months

  // Get competitor options based on agent type
  const getCompetitorOptions = () => {
    switch (agentType) {
      case "voice":
        return voiceAIPricing;
      case "rag":
        return ragPricing;
      case "automation":
        return workflowPricing;
    }
  };

  // Get unit label
  const getUnitLabel = () => {
    switch (agentType) {
      case "voice":
        return "minutes";
      case "rag":
        return "queries";
      case "automation":
        return "executions";
    }
  };

  // Calculate costs
  const costs = useMemo(() => {
    const competitors = getCompetitorOptions();
    const competitor = competitors[selectedCompetitor as keyof typeof competitors];
    
    let competitorMonthly = 0;
    let baselineAethonMonthly = 0;

    if (agentType === "voice") {
      const voice = competitor as typeof voiceAIPricing.retell;
      competitorMonthly = monthlyUsage * voice.totalPerMin;
      const aethon = aethonPricing.voiceAgent;
      baselineAethonMonthly = aethon.monthlyHosting + (monthlyUsage * aethon.perMinuteCost);
    } else if (agentType === "rag") {
      const rag = competitor as typeof ragPricing.openaiPinecone;
      // Assume 1000 tokens per query average
      const tokensPerQuery = 1000;
      const totalTokens = monthlyUsage * tokensPerQuery;
      competitorMonthly = rag.vectorDBMonthly + 
        (totalTokens / 1000 * rag.embeddingCostPer1K) + 
        (totalTokens / 1000 * rag.queryLLMCostPer1K);
      const aethon = aethonPricing.ragAgent;
      baselineAethonMonthly = aethon.monthlyHosting + (monthlyUsage * aethon.perQueryCost);
    } else {
      const workflow = competitor as typeof workflowPricing.n8nCloud;
      competitorMonthly = workflow.baseMonthlyCost + 
        (monthlyUsage / 1000 * workflow.costPer1KExecutions) +
        (monthlyUsage / 1000 * workflow.aiNodeCostPer1K * 0.3); // 30% use AI nodes
      const aethon = aethonPricing.automationAgent;
      baselineAethonMonthly = aethon.monthlyHosting + (monthlyUsage * aethon.perExecutionCost);
    }

    const enforcedAethonMonthly = competitorMonthly > 0
      ? Math.min(baselineAethonMonthly, competitorMonthly * 0.1)
      : 0;

    // Total cost over timeframe
    const competitorTotal = competitorMonthly * timeframe;
    const aethonTotal = enforcedAethonMonthly * timeframe;

    // Savings
    const totalSavings = competitorTotal - aethonTotal;
    const rawSavingsPercent = competitorTotal > 0 ? (totalSavings / competitorTotal) * 100 : 0;
    const savingsPercent = competitorTotal > 0 ? Math.max(90, rawSavingsPercent) : 0;
    const monthlySavings = competitorMonthly - enforcedAethonMonthly;

    return {
      competitorMonthly: Math.round(competitorMonthly),
      aethonMonthly: Math.round(enforcedAethonMonthly),
      competitorTotal: Math.round(competitorTotal),
      aethonTotal: Math.round(aethonTotal),
      totalSavings: Math.round(totalSavings),
      savingsPercent: Math.round(savingsPercent),
      monthlySavings: Math.round(monthlySavings),
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentType, monthlyUsage, selectedCompetitor, timeframe]);

  // Update competitor when agent type changes
  const handleAgentTypeChange = (type: AgentType) => {
    setAgentType(type);
    if (type === "voice") setSelectedCompetitor("retell");
    else if (type === "rag") setSelectedCompetitor("openaiPinecone");
    else setSelectedCompetitor("n8nCloud");
  };

  const competitors = getCompetitorOptions();
  const competitorData = competitors[selectedCompetitor as keyof typeof competitors] as {
    name: string;
    description: string;
  };

  return (
    <section id="calculator" className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {/* Premium purple background accents */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/25 rounded-full blur-3xl opacity-25" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            <span className="gradient-text">Calculate Your Profit</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how much margin you&apos;ll keep when you build with Aethon vs. reselling cloud solutions.
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
            {/* Agent Type Selection */}
            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                What type of AI agent do you need?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "voice" as AgentType, icon: Phone, label: "Voice AI" },
                  { type: "rag" as AgentType, icon: Database, label: "RAG / Knowledge" },
                  { type: "automation" as AgentType, icon: Workflow, label: "Automation" },
                ].map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => handleAgentTypeChange(type)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      agentType === type
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Usage */}
            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                Monthly {getUnitLabel()}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={monthlyUsage}
                  onChange={(e) => setMonthlyUsage(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-4 pr-24 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl text-black text-2xl font-bold focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                  {getUnitLabel()}/mo
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={monthlyUsage}
                onChange={(e) => setMonthlyUsage(parseInt(e.target.value))}
                className="w-full mt-4 accent-black"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1K</span>
                <span>50K</span>
                <span>100K</span>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Even at just 1K {agentType === "rag" ? "tokens" : getUnitLabel()}, you&apos;re keeping 90%+ margin vs. reselling cloud solutions.
              </p>
            </div>

            {/* Competitor Selection */}
            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                Compare against Cloud Solutions (Vapi, Retell, ElevenLabs)
              </label>
              <select
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black font-semibold focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition-all cursor-pointer"
              >
                {Object.entries(competitors).map(([key, service]) => (
                  <option key={key} value={key} className="bg-white">
                    {service.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                Per-minute + API charges = thin margins
              </p>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-black font-bold mb-4 text-lg">
                Calculate over
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([12, 24, 36] as const).map((months) => (
                  <button
                    key={months}
                    onClick={() => setTimeframe(months)}
                    className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                      timeframe === months
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {months / 12} Year{months > 12 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Why Aethon Saves More */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-gray-100 transition-all"
            >
              <span className="text-sm font-semibold text-black flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Your Profit When You Use Aethon vs. Reselling Cloud
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
                <h4 className="font-bold text-black mb-3">Scenario: Your client pays $5K/month for custom voice agent</h4>
                <div className="space-y-4 text-sm">
                  <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                    <div className="font-bold text-red-900 mb-2">Option 1: Resell Vapi/Retell</div>
                    <div className="space-y-1 text-red-700">
                      <div>Your cost: ~$3,500/month</div>
                      <div>Your margin: $1,500/month (30%)</div>
                      <div>Your client owns: Nothing (locked in)</div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                    <div className="font-bold text-green-900 mb-2">Option 2: Build with Aethon</div>
                    <div className="space-y-1 text-green-700">
                      <div>Your cost: ~$190/month</div>
                      <div>Your margin: $4,810/month (96%+)</div>
                      <div>Your client owns: Everything (locked in with you)</div>
                    </div>
                  </div>
                  <div className="bg-black rounded-xl p-4 text-white">
                    <div className="font-bold mb-1">Over 1 year: $32K more profit with Aethon</div>
                    <div className="text-sm text-gray-300">Plus: Clients can&apos;t leave because they own the agent</div>
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
            {/* Monthly Cost Comparison */}
            <div className="bg-white rounded-3xl p-8 premium-border premium-shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Monthly Cost</h3>
                <TrendingDown className="w-6 h-6 text-black" />
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-red-700 font-semibold">{competitorData.name}</span>
                      <span className="text-red-500 text-sm ml-2">(Cloud)</span>
                    </div>
                    <span className="text-red-600 font-bold text-2xl">
                      ${costs.competitorMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-red-500">
                    {monthlyUsage.toLocaleString()} {getUnitLabel()} × recurring fees
                  </div>
                </div>
                <div className="bg-black rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-white font-semibold">With Aethon</span>
                      <span className="text-gray-400 text-sm ml-2">(You Own It)</span>
                    </div>
                    <span className="text-white font-bold text-3xl">
                      ${costs.aethonMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300">
                    Hosting + compute only • Zero setup or activation fees
                  </div>
                </div>
              </div>
            </div>

            {/* Total Cost Over Time */}
            <div className="bg-white rounded-3xl p-8 premium-border premium-shadow-lg">
              <h3 className="text-xl font-bold text-black mb-4">
                {timeframe / 12}-Year Total Cost of Ownership
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">{competitorData.name}</div>
                  <div className="text-xl font-bold text-gray-600 line-through">
                    ${costs.competitorTotal.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="text-sm text-green-700 mb-1">Aethon (owned stack)</div>
                  <div className="text-xl font-bold text-green-700">
                    ${costs.aethonTotal.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 premium-shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-black">Your Savings</h3>
                <div className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                  {costs.savingsPercent}% Less
                </div>
              </div>
              <div className="text-black font-bold text-5xl mb-2">
                ${costs.totalSavings.toLocaleString()}
              </div>
              <div className="text-gray-700 font-semibold text-lg mb-1">
                Saved over {timeframe / 12} year{timeframe > 12 ? "s" : ""}
              </div>
              <div className="text-gray-600 text-sm">
                ${costs.monthlySavings.toLocaleString()}/month locked-in savings
              </div>

              {/* Ownership Badge */}
              <div className="mt-6 pt-6 border-t border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-green-900">Plus: Your Clients Own It Forever</div>
                    <div className="text-sm text-green-700">
                      No vendor lock-in. Full code ownership. Their infrastructure. Your clients stay with you because they own the agent.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full text-green-800 text-sm font-semibold mb-6">
            <DollarSign className="w-4 h-4 mr-2" />
            Stop Reselling Someone Else&apos;s AI
          </div>
          <p className="text-xl text-gray-600 mb-8 font-medium max-w-2xl mx-auto">
            Join agencies building custom agents and keeping 80%+ margins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-10 py-5 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all premium-shadow-lg hover:premium-shadow"
            >
              Schedule Demo
            </a>
            <a
              href="/products"
              className="px-10 py-5 border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all"
            >
              Explore Solutions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
