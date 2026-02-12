import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Star, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";
import { NewsContext } from "../context/newsContext";

export default function Courses() {
  const navigate = useNavigate();
  const { language } = useContext(NewsContext);
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const content = {
    EN: {
      heading: "Sacred Teachings",
      sub: "KNOWLEDGE • WISDOM • GROWTH",
      desc: "Learn, grow, and deepen your understanding with structured Orthodox teachings.",
      viewBtn: "BEGIN JOURNEY",
      loading: "Gathering Scrolls...",
      error: "The treasury is currently closed. Try again later."
    },
    AM: {
      heading: "ትምህርቶች",
      sub: "ትምህርት • ጥበብ • እድገት",
      desc: "በተዋቀሩ ኦርቶዶክሳዊ ትምህርቶች እውቀትዎን ያሳድጉ እና መንፈሳዊ ህይወትዎን ያጠናክሩ።",
      viewBtn: "ጉዞ ይጀምሩ",
      loading: "ትምህርቶችን በማዘጋጀት ላይ...",
      error: "ትምህርቶቹን መጫን አልተቻለም። እባክዎ ቆይተው ይሞክሩ።"
    }
  };

  const t = content[language];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [language]);

  return (
    <div className="bg-[#1A1614] min-h-screen py-32 px-6 relative overflow-hidden">
      {/* --- PREMIUM AMBIENT BACKGROUND --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-amber-500/30"></div>
            {/* LARGE SUBHEADING */}
            <span className="text-xl md:text-3xl font-black text-amber-500 uppercase tracking-[0.4em] md:tracking-[0.7em]">
              {t.sub}
            </span>
            <div className="h-px w-12 bg-amber-500/30"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter ${language === 'AM' ? 'font-sans' : 'font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60'}`}
          >
            {t.heading}
          </motion.h1>
          
          <motion.p className="text-white/50 text-xl md:text-3xl max-w-3xl mx-auto font-medium italic leading-relaxed">
            {t.desc}
          </motion.p>
        </div>

        {/* --- LOADING & ERROR STATES --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="text-amber-500 animate-spin" size={48} />
            <span className="text-amber-500 font-black uppercase tracking-widest text-sm">{t.loading}</span>
          </div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-red-400 font-black text-xl bg-red-500/10 py-10 rounded-[2rem] border border-red-500/20">
            {error}
          </motion.div>
        )}

        {/* --- COURSES GRID --- */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {courses.map((course, idx) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/courses/${course._id}`)}
                className="group relative bg-[#26211E] rounded-[3rem] p-2 border border-white/5 hover:border-amber-500/50 transition-all duration-700 cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
              >
                {/* Course Image */}
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 bg-amber-500 text-[#1A1614] p-3 rounded-2xl shadow-2xl transition-transform group-hover:rotate-12">
                    <BookOpen size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pt-10">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="text-amber-500" size={18} />
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Advanced Curriculum</span>
                  </div>

                  <h2 className={`text-3xl font-black text-white mb-4 group-hover:text-amber-500 transition-colors leading-tight ${language === 'AM' ? 'font-sans' : 'font-serif'}`}>
                    {course.title}
                  </h2>

                  <p className="text-white/40 mb-10 leading-relaxed line-clamp-2 text-lg italic">
                    {course.description}
                  </p>

                  <button className="w-full flex items-center justify-center gap-3 bg-white/5 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] group-hover:bg-amber-500 group-hover:text-[#1A1614] transition-all duration-500">
                    {t.viewBtn}
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- DECORATIVE FOOTER TAG --- */}
      <div className="mt-32 text-center opacity-20">
         <div className="flex items-center justify-center gap-4">
            <Star size={12} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[1em] text-white">Wisdom through Faith</span>
            <Star size={12} className="text-amber-500" />
         </div>
      </div>
    </div>
  );
}