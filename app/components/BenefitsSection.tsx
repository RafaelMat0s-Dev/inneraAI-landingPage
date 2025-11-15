// components/BenefitsSection.tsx
"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    emoji: "⚡",
    title: "Work Faster",
    desc: "Automate repetitive tasks so you focus on execution and momentum.",
  },
  {
    emoji: "🎯",
    title: "Clear Direction",
    desc: "Structured AI Powered workflows that eliminate confusion and decision fatigue.",
  },
  {
    emoji: "📈",
    title: "Scale Without Chaos",
    desc: "Systems that grow with you, so your business stops resetting every quarter.",
  },
  {
    emoji: "🤝",
    title: "Aligned Teamwork",
    desc: "Everyone knows what matters and executes without bottlenecks.",
  },
  {
    "emoji": "⏱️",
    "title": "Time Saved",
    "desc": "Automate the busywork and reclaim hours every week for what truly drives growth."
  }
];

export default function BenefitsSection() {
  return (
    <section id="product" className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-purple-400/10 to-indigo-500/10 blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-semibold leading-tight mb-6">
            Your Business Isn’t Failing — It’s Just Running Without a System.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
                Most businesses don't struggle because of lack of effort. They struggle 
                because knowledge lives in people's heads, work is done differently every 
                time, and the founder becomes the bottleneck. What you need is not more 
                motivation. You need structure that compounds.
            </p>

        {/* Chess Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mt-12">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              className={`
                p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/15 shadow-lg
                hover:scale-[1.04] transition-transform
                ${i % 2 === 1 ? "lg:translate-y-10" : ""}
                ${benefits.length % 4 === 1 && i === benefits.length - 1 ? "lg:col-span-4" : ""}
              `}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.42, 0, 0.58, 1] }}
              viewport={{ once: true }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.42, 0, 0.58, 1], 
                  delay: i * 0.4,
                },
              }}
            >
              <div className="text-5xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-85 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}