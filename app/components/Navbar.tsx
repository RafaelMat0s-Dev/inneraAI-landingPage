// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl rounded-2xl backdrop-blur-lg bg-white/30 border border-white/20 shadow-lg"
    >
      <div className="flex justify-between items-center h-16 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Innera<span className="text-purple-600">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#product" className="hover:text-purple-600 transition">
            Product
          </Link>
          <Link href="#pricing" className="hover:text-purple-600 transition">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-purple-600 transition">
            FAQ
          </Link>
          <Link
            href="#contactform"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <div className="space-y-1">
              <span
                className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/30 backdrop-blur-lg border-t border-white/20 rounded-b-2xl"
          >
            <div className="px-6 pt-2 pb-4 space-y-2 flex flex-col">
              <Link
                href="#product"
                className="hover:text-purple-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Product
              </Link>
              <Link
                href="#pricing"
                className="hover:text-purple-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="hover:text-purple-600 transition"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;