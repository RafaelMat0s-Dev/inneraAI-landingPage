"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

const tiers = [
  {
    name: "Starter",
    monthly: 25,
    yearly: 20,
    description: "Ideal for individuals or small projects starting to integrate AI automation.",
    benefits: [
      "1,000 AI Credits / month",
      "Essential AI workflows",
      "Email support",
      "1 Workspace",
      "Up to 3 automations",
      "Buy extra credits anytime",
    ],
    ribbon: "10% Off",
  },
  {
    name: "Growth",
    monthly: 50,
    yearly: 40,
    description: "For teams ready to scale operations with smarter automation and flexible AI usage.",
    benefits: [
      "5,000 AI Credits / month",
      "Advanced AI workflows that adapt to your business",
      "Priority human + AI support",
      "Multiple Workspaces",
      "AI Assistant for task execution",
      "Up to 15 automations",
      "Purchase extra credits as needed",
    ],
    ribbon: "Most Popular",
  },
  {
    name: "Pro",
    monthly: 100,
    yearly: 80,
    description: "For companies that rely on automation daily and want full control over AI scaling.",
    benefits: [
      "15,000 AI Credits / month",
      "Unlimited Workspaces & automations",
      "Custom integrations tailored to your systems",
      "1:1 strategy calls with our automation experts",
      "AI Agent Deployment for complex workflows",
      "Access to advanced SOP libraries",
      "Extra credits available anytime",
    ],
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    yearly: "Custom",
    description: "For organizations ready to build fully autonomous AI-driven operations.",
    benefits: [
      "Custom AI Credit packages",
      "Dedicated automation engineers",
      "Full AI Ops infrastructure support",
      "Private integrations & scaling",
      "White-glove onboarding & on-site options",
    ],
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  return (
    <section className="relative w-full py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Choose Your Plan
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
          Whether you're just getting started or scaling operations, we’ve got a plan built for you.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-3 mb-14">
          <span className={`text-sm ${!annual ? "text-white" : "text-white/60"}`}>Billed Monthly</span>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <span className={`text-sm ${annual ? "text-white" : "text-white/60"}`}>Billed Annually (Save 20%)</span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative group rounded-2xl p-6 border border-white/10 bg-white/10 backdrop-blur-lg
                         hover:bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]
                         flex flex-col justify-between transition-all cursor-pointer`}
            >
              {/* Ribbon */}
              {tier.ribbon && (
                <div className="absolute top-4 right-[-10px] bg-pink-500 text-white text-xs px-3 py-1 rounded rotate-12 shadow-lg">
                  {tier.ribbon}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-6">{tier.description}</p>

                <div className="mb-6">
                  {typeof tier.monthly === "number" ? (
                    <div className="flex items-center justify-center gap-2">
                      {annual && (
                        <span className="line-through text-white/50 text-lg">${tier.monthly}</span>
                      )}
                      <span className="text-4xl font-bold text-white">
                        ${annual ? tier.yearly : tier.monthly}
                        <span className="text-base text-white/60">/mo</span>
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-white">{tier.monthly}</span>
                  )}
                </div>

                <ul className="text-sm text-white/80 space-y-2 mb-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="items-center gap-1">
                      <span className="text-purple-300">•</span> {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button aligned at bottom */}
              <div className="mt-auto">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:opacity-90 transition">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}