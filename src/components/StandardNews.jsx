import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { NewsContext } from "../context/newsContext";

/**
 * Enhanced Premium StandardNewsCard
 * Features: Silk-gold accents, glassmorphism hover, and multi-language support.
 */
const StandardNewsCard = ({ article }) => {
  const { language } = useContext(NewsContext);
  const { imageUrl, title, category } = article;

  // Small internal dictionary for category translations if needed
  const t = {
    EN: { read: "Read More" },
    AM: { read: "ተጨማሪ ያንብቡ" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4 }}
      className="flex bg-white/70 backdrop-blur-sm rounded-2xl shadow-[0_10px_30px_rgba(120,53,15,0.05)] border border-amber-100 hover:border-amber-400 transition-all duration-500 group overflow-hidden"
    >
      {/* Image Container with Gold Overlay */}
      <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:to-amber-500/10 transition-colors" />
      </div>
      
      {/* Content Area */}
      <div className="p-4 flex flex-col justify-center flex-1">
        {/* Category Badge - Small & Elegant */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-[1px] w-3 bg-amber-600 transition-all group-hover:w-6" />
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">
            {category}
          </p>
        </div>
        
        {/* Title - Bold Serif/Sans Mix */}
        <h3 className={`text-sm md:text-base font-bold text-amber-950 line-clamp-2 leading-snug transition-colors group-hover:text-amber-700 ${language === 'AM' ? 'font-sans' : 'font-serif'}`}>
          <a href="#" title={title} className="focus:outline-none">
            {title}
          </a>
        </h3>

        {/* Read More Link (Visible on Hover) */}
        <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
            {t[language].read}
          </span>
          <ChevronRight size={12} className="text-amber-600" />
        </div>
      </div>

      {/* Side Accent Line */}
      <div className="w-1 bg-gradient-to-b from-amber-100 via-amber-400 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default StandardNewsCard;