"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10 bg-white/5 backdrop-blur-xl mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/70 text-center md:text-left"
        >
          <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <a href="#" className="hover:text-purple-400 transition-all">
            <Instagram className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}