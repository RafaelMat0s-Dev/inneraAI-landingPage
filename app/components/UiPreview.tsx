"use client";

import { motion } from "framer-motion";

export default function UiPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -20, y: 40 }}
      animate={{ opacity: 1, rotateY: -10, y: 0 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="
        relative w-full max-w-[42rem] mx-auto
        bg-white/10 backdrop-blur-xl
        border border-white/20 rounded-3xl
        shadow-[0_0_50px_rgba(255,255,255,0.25)]
        p-6
        transform-gpu
      "
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Title */}
      <div className="text-lg font-semibold text-white mb-5">
        InneraAI Operational Dashboard
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "SOPs Automated", value: "482+" },
          { label: "Work Hours Saved", value: "1,937+" },
          { label: "Lead Conversion Lift", value: "23%" },
          { label: "Avg. SOP Speedup", value: "4.2x" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.12 * i,
              ease: "easeOut",
            }}
            className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl p-4"
          >
            <div className="text-sm text-white/60">{stat.label}</div>
            <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* SOP CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl p-5"
      >
        <div className="text-white/70 text-sm mb-1">Active SOP</div>
        <div className="text-white font-semibold text-lg mb-4">
          Client Onboarding Pipeline
        </div>

        <div className="space-y-2">
          {[
            "Send intro email",
            "Schedule kickoff call",
            "Generate workspace access",
            "Automate weekly reporting",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.1 * i,
                ease: "easeOut",
              }}
              className="flex items-center gap-2 text-white/80 text-sm"
            >
              <span className="w-2 h-2 bg-white/80 rounded-full"></span>
              {step}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}