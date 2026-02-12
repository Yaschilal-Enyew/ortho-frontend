import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Star, ShieldCheck } from "lucide-react";
import { NewsContext } from "../context/newsContext";

export default function HeroSection() {
  const { language } = useContext(NewsContext);

  const content = {
    EN: {
      sub: "ESTABLISHED IN FAITH • UNITED IN KNOWLEDGE",
      title: "Elevating the Orthodox Spirit",
      desc: "The ultimate digital sanctuary for Orthodox students. Connecting campus life with ancient wisdom and modern fellowship.",
      primaryBtn: "Explore Treasury",
      secondaryBtn: "Join Community",
    },
    AM: {
      sub: "በእምነት የጸና • በእውቀት የበለጸገ",
      title: "ኦርቶዶክሳዊ መንፈስን ከፍ እናደርጋለን",
      desc: "ለኦርቶዶክሳዊያን ተማሪዎች የተዘጋጀ ልዩ ዲጂታል መድረክ። የካምፓስ ህይወትን ከጥንታዊ ጥበብ እና ከመንፈሳዊ ህብረት ጋር እናገናኛለን።",
      primaryBtn: "ቤተ-መጻሕፍቱን ይክፈቱ",
      secondaryBtn: "ማህበራችንን ይቀላቀሉ",
    }
  };

  const t = content[language];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1614]">
      {/* --- CINEMATIC BACKGROUND --- */}
      {/* Animated Gold Flare */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#D4AF37] rounded-full blur-[150px] pointer-events-none"
      />
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 text-center z-10">
        
        {/* --- PREMIUM BADGE --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-8 md:w-16 bg-amber-500/40"></div>
          <span className="text-lg md:text-3xl font-black text-amber-500 uppercase tracking-[0.4em] md:tracking-[0.8em] drop-shadow-lg">
            {t.sub}
          </span>
          <div className="h-px w-8 md:w-16 bg-amber-500/40"></div>
        </motion.div>

        {/* --- MASSIVE MAIN HEADING --- */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.9] ${language === "AM" ? "font-sans" : "font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-amber-200/50"}`}
        >
          {t.title}
        </motion.h1>

        {/* --- DESCRIPTION --- */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/60 font-bold max-w-3xl mx-auto text-xl md:text-3xl leading-relaxed mb-16 italic"
        >
          {t.desc}
        </motion.p>

        {/* --- CALL TO ACTION BUTTONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-black uppercase tracking-[0.3em] text-sm rounded-2xl flex items-center gap-3 transition-all"
          >
            <ShieldCheck size={20} />
            {t.primaryBtn}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-[0.3em] text-sm rounded-2xl flex items-center gap-3 transition-all"
          >
            <Sparkles size={20} className="text-amber-400" />
            {t.secondaryBtn}
          </motion.button>
        </motion.div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">Scroll Down</span>
        <ChevronDown className="text-white/30" size={24} />
      </motion.div>

      {/* Side Decorative Glows */}
      <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#D4AF37]/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent"></div>
    </section>
  );
}