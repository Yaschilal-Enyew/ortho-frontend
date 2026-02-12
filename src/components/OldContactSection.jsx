import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [form, setForm] = useState({ email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Subtle glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,223,71,0.1),_transparent_70%)]"></div>

      {/* Bottom fade to smoothly connect with footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black opacity-90 pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-yellow-400 mb-4 tracking-wide"
        >
          Contact Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 mb-10"
        >
          Send us your thoughts, questions, or feedback. We’ll reply to your student email.
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-black/70 backdrop-blur-lg border border-yellow-400 rounded-2xl shadow-2xl p-8 text-left"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-yellow-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="student@example.com"
              className="w-full px-4 py-3 bg-black/60 text-white border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none placeholder-gray-400 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-yellow-300 mb-2">
              Message
            </label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Type your message here..."
              rows="5"
              className="w-full px-4 py-3 bg-black/60 text-white border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none placeholder-gray-400 transition"
            ></textarea>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(255, 223, 71, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-bold rounded-lg uppercase tracking-wider hover:bg-yellow-500 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
