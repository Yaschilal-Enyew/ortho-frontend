import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NewsContext } from "../context/newsContext";

/**
 * StandardNewsCard - Premium Gold Edition
 * Features: Glossy ivory finish, gold-leaf accents, and bilingual typography support.
 */
const StandardNewsCard = ({ article }) => {
  const { language } = useContext(NewsContext);
  const { imageUrl, title, category } = article;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="flex bg-white/60 backdrop-blur-md rounded-2xl border border-amber-100 hover:border-amber-400 shadow-[0_8px_30px_rgb(120,53,15,0.04)] transition-all duration-500 group overflow-hidden"
    >
      {/* Premium Thumbnail with Zoom Effect */}
      <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          src={imageUrl}
          alt={title}
        />
        {/* Subtle Gold Inner Glow */}
        <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 pointer-events-none"></div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 md:p-6 flex flex-col justify-center flex-1">
        {/* Category Badge with Gold Dash */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-[2px] bg-amber-500 rounded-full transition-all group-hover:w-8"></span>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">
            {category}
          </p>
        </div>
        
        {/* Headline */}
        <h3 className={`text-sm md:text-base font-bold text-amber-950 line-clamp-2 leading-snug transition-colors group-hover:text-amber-800 ${language === "AM" ? "font-sans" : "font-serif tracking-tight"}`}>
          <a 
            href="#" 
            className="focus:outline-none"
            title={title}
          >
            {title}
          </a>
        </h3>

        {/* Hover Action - "Read Story" hint */}
        <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
           <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">
            {language === 'AM' ? 'ተጨማሪ አንብብ' : 'Read Full Story'}
           </span>
           <ArrowRight size={12} className="text-amber-600" />
        </div>
      </div>

      {/* Decorative End-Cap (A subtle gold bar on the right side) */}
      <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-amber-200 to-transparent group-hover:via-amber-500 transition-all duration-500"></div>
    </motion.div>
  );
};

export default StandardNewsCard;