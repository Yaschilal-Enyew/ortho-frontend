import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, MessageCircle, Search, ChevronRight, Send, Sparkles, Crown } from "lucide-react";
import axios from "axios";
import { NewsContext } from "../context/newsContext";

export default function NewsSection() {
  const { language } = useContext(NewsContext);
  
  const [news, setNews] = useState([]);
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);
  const backendUrl = "http://localhost:5000/api";

  const content = {
    EN: {
      heading: "Sacred Chronicles",
      subHeading: "PREMIUM UPDATES • COMMUNITY NEWS",
      search: "Search the royal archive...",
      readMore: "Explore Article",
      loadMore: "UNVEIL MORE NEWS",
      today: "NEW REVELATION",
      old: "ARCHIVED",
      comment: "Share your reflection...",
    },
    AM: {
      heading: "የግቢው ዜናዎች",
      subHeading: "ልዩ መረጃዎች • ሃይማኖታዊ ዜና",
      search: "ዜናዎች ይፈልጉ...",
      readMore: "ሙሉውን አንብብ",
      loadMore: "ተጨማሪ ታሪኮችን ክፈት",
      today: "የዛሬ ድምቀት",
      old: "የቆዩ",
      comment: "አስተያየትዎን እዚህ ይጻፉ...",
    }
  };

  const t = content[language];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${backendUrl}/news/paginates?page=1&limit=10`);
        setNews(res.data.posts || []);
      } catch (err) { console.error(err); }
    };
    fetchNews();
  }, []);

  const handleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    setLikes(prev => ({ ...prev, [id]: liked[id] ? (prev[id] || 1) - 1 : (prev[id] || 0) + 1 }));
  };

  return (
    <section id="news" className="py-28 relative min-h-screen overflow-hidden bg-[#1A1614]">
      {/* --- DEEP GOLD & DARK GRADIENTS --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#B8860B_0%,_transparent_50%)] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#D4AF37_0%,_transparent_40%)] opacity-10 pointer-events-none"></div>
      
      {/* Metallic Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* --- ENHANCED HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-amber-500/50"></div>
            {/* LARGE SUBHEADING REQUESTED */}
            <span className="text-xl md:text-3xl font-black text-[#D4AF37] uppercase tracking-[0.4em] md:tracking-[0.7em] drop-shadow-lg">
              {t.subHeading}
            </span>
            <div className="h-[1px] w-12 bg-amber-500/50"></div>
          </motion.div>

          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className={`text-7xl md:text-9xl font-black text-white tracking-tighter mb-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] ${language === "AM" ? "font-sans" : "font-serif italic"}`}
          >
            {t.heading}
          </motion.h2>

          <div className="relative w-full max-w-2xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 group-focus-within:scale-110 transition-transform" size={24} />
            <input
              type="text"
              placeholder={t.search}
              className="bg-white/5 border-2 border-amber-900/30 text-white pl-16 pr-8 py-6 rounded-2xl w-full focus:outline-none focus:border-amber-500 transition-all font-bold backdrop-blur-md text-lg placeholder:text-white/20"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* --- NEWS CARDS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {news.filter(n => n.title.toLowerCase().includes(search.toLowerCase())).slice(0, visibleCount).map((item) => (
            <motion.article
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-[#26211E] rounded-[3.5rem] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/5 hover:border-amber-500/50 transition-all duration-700"
            >
              {/* Image Container */}
              <div className="relative h-[450px] rounded-[3rem] overflow-hidden">
                <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-transparent"></div>
                
                {/* Gold Foil Badge */}
                <div className="absolute top-8 left-8 px-6 py-2.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white rounded-full shadow-2xl flex items-center gap-2">
                  <Crown size={14} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                     {new Date(item.date).toDateString() === new Date().toDateString() ? t.today : t.old}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-10 pt-8">
                <h3 className={`text-4xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-[#D4AF37] transition-all duration-500 ${language === "AM" ? "font-sans" : "font-serif"}`}>
                  {item.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed mb-10 line-clamp-3 text-xl font-medium">
                  {item.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-10">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => handleLike(item._id)}
                      className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all shadow-xl ${liked[item._id] ? 'bg-amber-600 text-white' : 'bg-white/5 text-amber-500 hover:bg-white/10'}`}
                    >
                      <ThumbsUp size={20} fill={liked[item._id] ? "currentColor" : "none"} />
                      <span className="text-lg font-black">{likes[item._id] || 0}</span>
                    </button>
                    
                    <button 
                      onClick={() => setShowComments(prev => ({ ...prev, [item._id]: !prev[item._id] }))}
                      className="p-4 bg-white/5 text-white rounded-2xl hover:bg-amber-500 hover:text-[#1A1614] transition-all border border-white/10"
                    >
                      <MessageCircle size={24} />
                    </button>
                  </div>

                  <button className="flex items-center gap-3 text-amber-500 font-black text-sm uppercase tracking-[0.3em] group/btn">
                    {t.readMore}
                    <ChevronRight size={20} className="group-hover/btn:translate-x-3 transition-transform duration-500" />
                  </button>
                </div>

                {/* Comment Section (Slide) */}
                <AnimatePresence>
                  {showComments[item._id] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-10">
                      <div className="flex gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                        <input 
                          className="flex-1 bg-transparent border-none text-white text-lg px-4 focus:ring-0 placeholder:text-white/20 font-medium" 
                          placeholder={t.comment}
                          value={newComment[item._id] || ""}
                          onChange={(e) => setNewComment(p => ({ ...p, [item._id]: e.target.value }))}
                        />
                        <button className="bg-amber-600 p-4 rounded-2xl text-white shadow-2xl hover:bg-amber-400 transition-colors">
                          <Send size={22} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-32 text-center relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
          <motion.button
            whileHover={{ scale: 1.05, letterSpacing: "0.6em", backgroundColor: "#D4AF37", color: "#1A1614" }}
            onClick={() => setVisibleCount(v => v + 2)}
            className="px-20 py-8 bg-transparent border-2 border-amber-500 text-amber-500 font-black uppercase tracking-[0.5em] text-xs rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500"
          >
            {t.loadMore}
          </motion.button>
        </div>
      </div>
    </section>
  );
}