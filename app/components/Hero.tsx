// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import UiPreview from "./UiPreview";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-20 pt-28 md:pt-16">
      {/* Floating bright shapes */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-200/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center lg:text-left space-y-6 z-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-white">Smarter SOPs, Better Leads,</span> <span className="text-purple-300">Powered By AI</span>
          </h1>
          <p className="text-gray-100 text-lg sm:text-xl lg:text-xl max-w-xl mx-auto lg:mx-0">
            Your operations deserve more than spreadsheets and manual tasks. With InneraAI, <b>AI becomes your silent partner</b> — organizing, optimizing, and evolving with your business.
          </p>
          <Link
            href="#contactform"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
          >
            Talk to an AI Specialist Now
          </Link>
        </motion.div>

        <UiPreview/>
        
      </div>
    </section>
  );
};

export default Hero;