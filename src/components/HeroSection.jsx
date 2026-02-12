import React, { useContext } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/branaa.png";
import { NewsContext } from "../context/newsContext";

export default function HeroSection() {

  const { language } = useContext(NewsContext);

  const content = {
    EN: {
      badge: "Faith • Hope • Love",
      title: "Welcome to the",
      titleAccent: "Orthodox Student Platform",
      description: "A sacred space for faith, learning, and community. Access exclusive events, news, and spiritual resources curated for the modern student.",
      btnPrimary: "Explore News",
      cardTitle: "Community Life",
      cardDesc: "Join events, read news and connect with students across campuses globally.",
      floatingTitle: "Live Events Now",
      floatingSub: "12 Active Campuses"
    },
    AM: {
      badge: "እምነት • ተስፋ • ፍቅር",
      title: "እንኳን ወደ",
      titleAccent: "ኦርቶዶክሳዊ ተማሪዎች መድረክ በሰላም መጡ",
      description: "ለእምነት፣ ለትምህርት እና ለማህበራዊ ህይወት የተዘጋጀ ቅዱስ ስፍራ። ለዘመኑ ተማሪዎች የተዘጋጁ ልዩ ኩነቶችን፣ ዜናዎችን እና መንፈሳዊ ግብዓቶችን ያግኙ።",
      btnPrimary: "ዜናዎችን ተመልከት",
      cardTitle: "የማህበረሰብ ህይወት",
      cardDesc: "በየካምፓሱ ካሉ ተማሪዎች ጋር ይገናኙ፣ ኩነቶችን ይሳተፉ፣ ዜናዎችን ያንብቡ።",
      floatingTitle: "ቀጥታ ኩነቶች",
      floatingSub: "12 ንቁ ግቢዎች"
    }
  };

  const t = content[language] || content.EN;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Premium Vignette */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="background" className="w-full h-full object-cover opacity-60 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>

      <div className="container mx-auto px-6 pt-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Text Content */}
        <motion.div
          className="flex-[1.2] text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* DYNAMIC BADGE */}
          <motion.span 
            className="inline-block py-1.5 px-5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t.badge}
          </motion.span>

          <h1 className={`text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 ${language === "AM" ? 'font-sans' : 'font-serif'}`}>
            {t.title} <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent italic">
              {t.titleAccent}
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-medium opacity-90">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
            <motion.a 
              href="#news" 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black uppercase tracking-widest text-sm rounded-full shadow-2xl transition-all text-center"
            >
              {t.btnPrimary}
            </motion.a>
           
          </div>
        </motion.div>

        {/* Premium Floating Image Card */}
        <motion.div 
          className="flex-1 relative group"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute -inset-6 bg-amber-500/20 rounded-[3rem] blur-3xl group-hover:bg-amber-500/30 transition duration-700"></div>
          
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-2xl transform group-hover:-translate-y-3 transition-all duration-700">
            <div className="relative h-72 md:h-96 overflow-hidden">
              <img src={heroImage} alt="hero" className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
            </div>
            
            <div className="p-8 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-3 w-3 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]"></span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{t.cardTitle}</h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                {t.cardDesc}
              </p>
            </div>
          </div>
          
          {/* Floating Element (Dynamic Content) */}
          <motion.div 
            className="absolute -bottom-6 -left-8 bg-white py-4 px-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] hidden md:block border border-gray-100"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
             <p className="text-black font-black text-xs uppercase tracking-widest mb-1">{t.floatingTitle}</p>
             <div className="h-1 w-full bg-amber-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-2/3"></div>
             </div>
             <p className="text-amber-600 text-[11px] font-black mt-2 uppercase">{t.floatingSub}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}