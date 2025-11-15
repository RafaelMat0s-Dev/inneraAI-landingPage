"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
        });

        const result = await res.json();
        if (result.success) {
          alert("Message sent!");
          setFormData({ name: "", email: "", company: "", phone: "", message: "" });
        } else {
          alert("Error sending message. Try again.");
          console.error(result.error);
        }
      } catch (err) {
        console.error(err);
        alert("Error sending message. Try again.");
      }
};


  return (
    <section id="contactform" className="relative py-28 px-6 w-full overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full -top-40 -left-40"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full bottom-0 right-0"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-white/70 text-center mb-12 max-w-lg mx-auto">
          Let’s connect! Whether you have questions, feedback, or partnership ideas — we’d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-white/70 mb-2">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">Company</label>
            <input
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Company"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2">Phone Number</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 555 123 4567"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/70 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your message..."
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90 transition-all"
            >
              Send Message
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}