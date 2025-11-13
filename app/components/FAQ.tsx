"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is InneraAI?",
    answer:
      "InneraAI is an AI-powered automation platform built for real estate and automotive businesses. We help you centralize operations, automate follow-ups, manage clients, and optimize sales processes — all from one intelligent system.",
  },
  {
    question: "How do I get started?",
    answer:
      "Choose the plan that fits your business size. After signup, you’ll instantly access your dashboard with prebuilt automations for client management, sales tracking, and SOP templates customized for your industry.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can upgrade or downgrade anytime without losing data or workflows. Whether your dealership or agency grows, InneraAI grows with you.",
  },
  {
    question: "Do AI credits roll over?",
    answer:
      "Yes. Any unused AI credits can roll over to the next month depending on your plan — so you only pay for what you use. You can also purchase more credits anytime for busy sales periods or marketing campaigns.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-grade encryption and secure cloud infrastructure to protect sensitive business data, client information, and transaction records at all times.",
  },
  {
    question: "Who is InneraAI for?",
    answer:
      "InneraAI is built for real estate agencies, automotive dealers, and sales teams that want to automate client management, reduce manual work, and scale operations without adding complexity.",
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
              <AccordionContent className="text-white/85 px-6 pb-4 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}