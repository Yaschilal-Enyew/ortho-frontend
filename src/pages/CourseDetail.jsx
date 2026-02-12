import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, BookOpen, ChevronRight, Star, Sparkles, Layout, ArrowLeft } from "lucide-react";
import axios from "axios";
import { NewsContext } from "../context/newsContext";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(NewsContext);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const descRef = useRef(null);

  const content = {
    EN: {
      sub: "SACRED KNOWLEDGE • LESSON ARCHIVE",
      seeMore: "See More ↓",
      seeLess: "Show Less ↑",
      lessons: "Course Lessons",
      quizBtn: "START SPIRITUAL QUIZ",
      loading: "Opening the Scrolls...",
      back: "Back to Courses"
    },
    AM: {
      sub: "መንፈሳዊ እውቀት • የትምህርት ማህደር",
      seeMore: "ተጨማሪ ተመልከት ↓",
      seeLess: "በትንሹ አሳይ ↑",
      lessons: "የትምህርት ዝርዝር",
      quizBtn: "ፈተናውን ይጀምሩ",
      loading: "ትምህርቱን በመጫን ላይ...",
      back: "ወደ ትምህርቶች ተመለስ"
    }
  };

  const t = content[language];

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/lessons/${id}`);
        const lessonsData = res.data;

        if (!lessonsData || lessonsData.length === 0) {
          setError(language === "AM" ? "ምንም ትምህርት አልተገኘም" : "No lessons found.");
          return;
        }

        setLessons(lessonsData);
        setCourse({
          title: lessonsData[0].title,
          description: lessonsData[0].description,
          video: lessonsData[0].videoUrl,
        });
      } catch (err) {
        setError(language === "AM" ? "ትምህርቱን መጫን አልተቻለም" : "Failed to load course.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndLessons();
  }, [id, language]);

  useEffect(() => {
    if (descRef.current) setFullHeight(descRef.current.scrollHeight);
  }, [course, showFullDesc]);

  if (loading) return (
    <div className="min-h-screen bg-[#1A1614] flex flex-col items-center justify-center gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
        <Sparkles className="text-amber-500" size={48} />
      </motion.div>
      <span className="text-amber-500 font-black uppercase tracking-[0.4em]">{t.loading}</span>
    </div>
  );

  return (
    <div className="bg-[#1A1614] min-h-screen py-20 px-4 md:px-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-amber-500/60 hover:text-amber-500 font-black uppercase tracking-widest text-xs mb-10 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          {t.back}
        </button>

        {/* --- VIDEO THEATER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group rounded-[3rem] overflow-hidden bg-black shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 mb-12"
        >
          <video
            src={course.video}
            controls
            autoPlay
            className="w-full aspect-video object-contain"
          />
        </motion.div>

        {/* --- HEADER & DESCRIPTION --- */}
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-amber-500" size={16} fill="currentColor" />
              <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-xs">{t.sub}</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter ${language === "AM" ? 'font-sans' : 'font-serif italic'}`}>
              {course.title}
            </h1>

            <motion.div layout className="relative">
              <motion.p
                ref={descRef}
                animate={{ maxHeight: showFullDesc ? fullHeight : 100 }}
                className="text-white/60 text-xl leading-relaxed overflow-hidden italic font-medium"
              >
                {course.description}
              </motion.p>

              {!showFullDesc && <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#1A1614] to-transparent" />}

              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="mt-6 text-amber-500 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-white transition-colors"
              >
                {showFullDesc ? t.seeLess : t.seeMore}
              </button>
            </motion.div>
          </div>

          {/* Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#26211E] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl sticky top-24">
              <Layout className="text-amber-500 mb-6" size={40} />
              <h4 className="text-white font-black text-xl mb-4 uppercase tracking-widest">Mastery Status</h4>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">Complete all lessons in this treasury to unlock the final spiritual certification.</p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => lessons.length > 0 ? navigate(`/${lessons[0]._id}/quizzes`) : alert("No Lessons")}
                className="w-full py-6 bg-gradient-to-r from-amber-600 to-amber-400 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl shadow-amber-900/20"
              >
                {t.quizBtn}
              </motion.button>
            </div>
          </div>
        </div>

        {/* --- LESSONS ARCHIVE (THE LIST) --- */}
        <div className="mt-20">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-white/5"></div>
            <h2 className={`text-4xl md:text-5xl font-black text-white tracking-tighter ${language === "AM" ? 'font-sans' : 'font-serif'}`}>
              {t.lessons}
            </h2>
            <div className="h-px flex-1 bg-white/5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lessons.map((lesson, idx) => (
              <motion.div
                key={lesson._id}
                whileHover={{ y: -10 }}
                onClick={() => {
                  setCourse({ ...course, video: lesson.videoUrl, title: lesson.title, description: lesson.description });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex gap-6 p-6 rounded-[2.5rem] transition-all cursor-pointer border ${course.video === lesson.videoUrl ? 'bg-amber-500/10 border-amber-500/50' : 'bg-[#26211E] border-white/5 hover:border-amber-500/20'}`}
              >
                <div className="relative w-40 h-28 flex-shrink-0 overflow-hidden rounded-2xl bg-black">
                  <video src={lesson.videoUrl} className="w-full h-full object-cover opacity-60" muted />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={20} className="text-white/80" fill="currentColor" />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Lesson {idx + 1}</span>
                  <h3 className="text-xl font-black text-white mb-2 line-clamp-1">{lesson.title}</h3>
                  <p className="text-white/40 text-sm line-clamp-1 italic">{lesson.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}