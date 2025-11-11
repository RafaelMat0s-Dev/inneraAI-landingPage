"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is InneraAI?",
    answer: "InneraAI is an AI-powered automation platform that helps you organize, optimize, and evolve your business operations with minimal manual effort.",
  },
  {
    question: "How do I get started?",
    answer: "Sign up for a plan that fits your needs. You’ll gain immediate access to AI-driven workflows and SOP templates tailored to your business.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes! You can upgrade or downgrade your subscription at any time. Your data and workflows remain intact.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. InneraAI uses industry-standard encryption and secure cloud storage to ensure your business data is safe at all times.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative w-full py-28 px-6 bg-gradient-to-b from-indigo-900/10 to-indigo-900/30 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-white/70">
          Have questions? We’ve got answers. Explore our most common queries below.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto space-y-4"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all"
            >
              <AccordionTrigger className="text-white text-lg font-semibold px-6 py-4 flex justify-between items-center">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 px-6 pb-4 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}