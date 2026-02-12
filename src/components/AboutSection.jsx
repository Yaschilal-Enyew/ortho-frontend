import React, { useContext } from "react";
import a1 from "../assets/post1.png";
import a2 from "../assets/post2.png";
import a3 from "../assets/post3.png";
import { motion } from "framer-motion";
import { Cross, Compass, Users, Sparkles, ChevronRight, Star } from "lucide-react";
import { NewsContext } from "../context/newsContext";

export default function AboutSection() {
  const { language } = useContext(NewsContext);

  const content = {
    EN: {
      heading: "Our Sacred Mission",
      subheading: "HERITAGE • COMMUNITY • FAITH",
      description: "We are dedicated to fostering a sanctified environment for Orthodox students, bridging the gap between academic excellence and spiritual growth across all campuses.",
      vision: "A supportive network of believers shining light in every university.",
      programs: [
        { title: "Spiritual Guidance", desc: "Access ancient wisdom and pastoral support for modern campus life." },
        { title: "Community Bonds", desc: "Connect with brothers and sisters in faith through organized fellowships." },
        { title: "Resource Treasury", desc: "Digital library of hymns, lessons, and liturgical calendars at your fingertips." }
      ]
    },
    AM: {
      heading: "ስለ ግቢ ጉባኤያችን",
      subheading: "ቅርስ • ማህበረሰብ • እምነት",
      description: "በሁሉም ግቢዎች ውስጥ ለኦርቶዶክሳዊያን ተማሪዎች የተቀደሰ አካባቢን ለመፍጠር፣ የአካዳሚክ ጥንካሬን ከመንፈሳዊ እድገት ጋር ለማገናኘት እንሰራለን።",
      vision: "በእያንዳንዱ ዩኒቨርሲቲ ውስጥ ብርሃን የሚሆኑ የእምነት ወንድማማችነትን መገንባት።",
      programs: [
        { title: "መንፈሳዊ መመሪያ", desc: "ለዘመናዊው የካምፓስ ሕይወት ጥንታዊ ጥበብን እና እረኛዊ ድጋፍን ያግኙ።" },
        { title: "የማህበረሰብ አንድነት", desc: "በተደራጁ ህብረቶች ውስጥ በእምነት ከወንድሞች እና እህቶች ጋር ይገናኙ።" },
        { title: "የእውቀት ግምጃ ቤት", desc: "የመዝሙራት፣ የትምህርቶች እና የቤተክርስቲያን መቁጠሪያዎች ዲጂታል ቤተ-መጻሕፍት።" }
      ]
    }
  };

  const t = content[language];
  const images = [a1, a2, a3];
  const icons = [<Cross size={24} />, <Users size={24} />, <Compass size={24} />];

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-[#1A1614]">
      {/* --- PREMIUM DARK BACKGROUND WITH GOLDEN GLOW --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#B8860B_0%,_transparent_65%)] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent"></div>

      {/* Golden Particle Effect (Subtle) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* --- ENHANCED HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 mb-8"
          >
            <Star className="text-amber-500 fill-amber-500" size={14} />
            {/* LARGE BOLD SUBHEADING */}
            <span className="text-xl md:text-3xl font-black text-amber-500 uppercase tracking-[0.4em] md:tracking-[0.8em]">
              {t.subheading}
            </span>
            <Star className="text-amber-500 fill-amber-500" size={14} />
          </motion.div>
          
          <motion.h2 
            className={`text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl ${language === 'AM' ? 'font-sans' : 'font-serif italic'}`}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
          >
            {t.heading}
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-xl md:text-2xl max-w-4xl font-medium leading-relaxed italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t.description}
          </motion.p>
        </div>

        {/* --- PROGRAM CARDS: OBSIDIAN GLASS STYLE --- */}
        <div className="grid lg:grid-cols-3 gap-12">
          {t.programs.map((prog, i) => (
            <motion.div 
              key={i} 
              className="group relative bg-gradient-to-b from-amber-500/20 to-transparent rounded-[3rem] p-[1px] shadow-2xl transition-all duration-500"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -15 }}
            >
              {/* Inner Dark Card */}
              <div className="bg-[#1A1614] rounded-[2.95rem] overflow-hidden h-full flex flex-col border border-white/5 group-hover:border-amber-500/50 transition-colors">
                <div className="relative h-64 overflow-hidden">
                  <img src={images[i]} alt={prog.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-transparent"></div>
                  
                  {/* Floating Icon Badge - Metallic Gold */}
                  <div className="absolute -bottom-6 right-10 bg-gradient-to-br from-amber-400 to-amber-700 text-white p-5 rounded-3xl shadow-[0_10px_30px_rgba(184,134,11,0.5)] z-10 transition-transform group-hover:rotate-12">
                    {icons[i]}
                  </div>
                </div>

                <div className="p-10 pt-12">
                  <h4 className={`text-3xl font-black text-white mb-4 group-hover:text-amber-500 transition-colors ${language === 'AM' ? 'font-sans' : 'font-serif'}`}>
                    {prog.title}
                  </h4>
                  <p className="text-white/50 text-lg font-medium leading-relaxed mb-8">
                    {prog.desc}
                  </p>
                  
                  <button className="flex items-center gap-3 text-amber-500 font-black text-xs uppercase tracking-[0.3em] group/btn">
                    {language === 'AM' ? 'ተጨማሪ ተረዳ' : 'Learn More'}
                    <div className="w-8 h-[1px] bg-amber-500 transition-all group-hover/btn:w-12"></div>
                    <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM VISION BANNER: EMBOSSED STYLE --- */}
        <motion.div 
          className="mt-28 p-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded-[2.5rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="bg-[#26211E] rounded-[2.4rem] py-14 px-10 text-center shadow-inner">
             <Sparkles className="mx-auto mb-6 text-amber-500/30" size={40} />
            <h5 className={`text-[#D4AF37] text-2xl md:text-4xl font-black italic tracking-tight leading-snug ${language === 'AM' ? 'font-sans' : 'font-serif'}`}>
              "{t.vision}"
            </h5>
          </div>
        </motion.div>
      </div>
    </section>
  );
}