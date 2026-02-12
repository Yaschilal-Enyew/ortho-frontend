import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MessageSquare, Sparkles, CheckCircle2, AlertCircle, PhoneCall } from "lucide-react";
import axios from "axios";
import { NewsContext } from "../context/newsContext";

export default function ContactSection() {
  const { language } = useContext(NewsContext);
  const [form, setForm] = useState({ email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: "" });

  const content = {
    EN: {
      heading: "Contact Us",
      subHeading: "COMMUNICATION • FEEDBACK • SUPPORT",
      desc: "Send us your thoughts or questions. Our council will review your message and reply to your student email.",
      labelEmail: "Your Royal Email",
      labelMessage: "Your Message",
      placeholderEmail: "student@university.edu",
      placeholderMessage: "Share your reflections with us...",
      btnSend: "Dispatch Message",
      btnLoading: "Sending...",
      success: "Message received in the treasury!",
      error: "The scrolls could not be sent. Try again."
    },
    AM: {
      heading: "ያግኙን",
      subHeading: "ግንኙነት • አስተያየት • ድጋፍ",
      desc: "ሀሳብዎን ወይም ጥያቄዎን ይላኩልን። መልእክትዎን አይተን በተማሪ ኢሜልዎ በኩል ምላሽ እንሰጣለን።",
      labelEmail: "የእርስዎ ኢሜል",
      labelMessage: "መልእክትዎ",
      placeholderEmail: "ተማሪ@ዩኒቨርሲቲ.edu",
      placeholderMessage: "ሀሳብዎን እዚህ ይጻፉ...",
      btnSend: "መልእክቱን ላክ",
      btnLoading: "በመላክ ላይ...",
      success: "መልእክትዎ በትክክል ደርሶናል!",
      error: "መልእክቱ አልተላከም። እባክዎ እንደገና ይሞክሩ።"
    }
  };

  const t = content[language];

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: null, message: "" });

    try {
      const res = await axios.post("http://localhost:5000/api/comment/contact", {
        email: form.email,
        comment: form.message,
      });

      if (res.data.success) {
        setStatus({ success: true, message: t.success });
        setForm({ email: "", message: "" });
      }
    } catch (err) {
      setStatus({ success: false, message: t.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-[#D4AF37]">
      {/* --- PREMIUM BOLD GOLD BACKGROUND --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#B8860B] opacity-95"></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
      
      {/* Animated Light Beams */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-amber-900/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            {/* LARGE BOLD SUBHEADING */}
            <h4 className="text-xl md:text-3xl font-black text-[#2D241E] uppercase tracking-[0.4em] md:tracking-[0.7em] leading-relaxed">
              {t.subHeading.split("•")[0]} 
              <span className="text-white/50 mx-2">•</span> 
              {t.subHeading.split("•")[1]} 
              <span className="text-white/50 mx-2">•</span> 
              {t.subHeading.split("•")[2]}
            </h4>
            <div className="h-1.5 w-24 bg-[#2D241E] mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className={`text-6xl md:text-9xl font-black text-[#2D241E] mb-8 tracking-tighter drop-shadow-2xl ${language === "AM" ? 'font-sans' : 'font-serif italic'}`}
          >
            {t.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#2D241E] font-bold max-w-2xl mx-auto text-xl leading-relaxed opacity-80"
          >
            {t.desc}
          </motion.p>
        </div>

        {/* --- FORM CONTAINER --- */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="bg-[#2D241E] rounded-[4rem] p-1.5 shadow-[0_60px_100px_rgba(0,0,0,0.4)]"
        >
          <form
            onSubmit={submit}
            className="bg-white rounded-[3.8rem] p-10 md:p-16 relative overflow-hidden"
          >
            {/* Subtle background icon */}
            <PhoneCall className="absolute -right-10 -bottom-10 text-amber-50 opacity-50" size={300} strokeWidth={0.5} />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 mb-10">
              {/* Email Field */}
              <div className="relative group">
                <label className="flex items-center gap-3 text-sm font-black text-amber-900 uppercase tracking-[0.2em] mb-4 ml-1">
                  <Mail size={18} className="text-amber-600" /> {t.labelEmail}
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.placeholderEmail}
                  className="w-full px-8 py-5 bg-[#FDFBF7] border-2 border-amber-100 focus:border-[#D4AF37] text-[#2D241E] rounded-[2rem] outline-none transition-all font-bold placeholder:text-amber-900/20 text-lg shadow-inner"
                />
              </div>

              {/* Message Quick-Input (Top half of the message logic) */}
              <div className="relative group">
                <label className="flex items-center gap-3 text-sm font-black text-amber-900 uppercase tracking-[0.2em] mb-4 ml-1">
                  <MessageSquare size={18} className="text-amber-600" /> {t.labelMessage}
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.placeholderMessage}
                  rows="1"
                  className="w-full px-8 py-5 bg-[#FDFBF7] border-2 border-amber-100 focus:border-[#D4AF37] text-[#2D241E] rounded-[2rem] outline-none transition-all font-bold placeholder:text-amber-900/20 text-lg shadow-inner resize-none overflow-hidden"
                />
              </div>
            </div>

            {/* Main Message Area */}
            <div className="relative z-10 mb-10">
               <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.placeholderMessage}
                  rows="4"
                  className="w-full px-8 py-6 bg-[#FDFBF7] border-2 border-amber-100 focus:border-[#D4AF37] text-[#2D241E] rounded-[2.5rem] outline-none transition-all font-bold placeholder:text-amber-900/20 text-lg shadow-inner"
                ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "#2D241E", 
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)" 
              }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className={`relative z-10 w-full py-7 flex items-center justify-center gap-4
                ${loading ? "opacity-60 cursor-not-allowed" : ""}
                bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-black uppercase tracking-[0.5em] text-sm
                rounded-[2rem] shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500`}
            >
              {loading ? t.btnLoading : t.btnSend}
              {!loading && <Send size={20} className="animate-pulse" />}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-8 p-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm tracking-widest ${
                    status.success 
                      ? "bg-green-50 text-green-700 border border-green-200 shadow-sm" 
                      : "bg-red-50 text-red-700 border border-red-200 shadow-sm"
                  }`}
                >
                  {status.success ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
                  {status.message.toUpperCase()}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* --- PREMIUM FOOTER TAG --- */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 text-[#2D241E]/40">
            <div className="h-[1px] w-12 bg-[#2D241E]/20"></div>
            <Sparkles size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Spiritual Excellence</span>
            <Sparkles size={20} />
            <div className="h-[1px] w-12 bg-[#2D241E]/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}