import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowLeft, RotateCcw, CheckCircle2, XCircle, Sparkles, Star, Loader2, ShieldCheck } from "lucide-react";
import axios from "axios";
import { NewsContext } from "../context/newsContext";

export default function Quize() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(NewsContext);

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({}); 
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const content = {
    EN: {
      subheading: "KNOWLEDGE CHECK • SPIRITUAL GROWTH",
      loading: "Preparing your trial...",
      error: "This lesson doesn't have a quiz yet.",
      finish: "Finish & See Results",
      back: "Back to Lessons",
      retry: "Try Again",
      scoreLabel: "Final Score",
      perfect: "Excellent! You've mastered this lesson.",
      good: "Good job! Keep growing in faith."
    },
    AM: {
      subheading: "የእውቀት ምዘና • መንፈሳዊ እድገት",
      loading: "ምዘናውን በማዘጋጀት ላይ...",
      error: "ለዚህ ትምህርት እስካሁን ጥያቄዎች አልተዘጋጁም።",
      finish: "ውጤቱን እይ",
      back: "ወደ ትምህርቶች ተመለስ",
      retry: "እንደገና ሞክር",
      scoreLabel: "ጠቅላላ ውጤት",
      perfect: "በጣም ጥሩ! ትምህርቱን በሚገባ ተረድተውታል።",
      good: "ጥሩ ነው! በእውቀት ማደግዎን ይቀጥሉ።"
    }
  };

  const t = content[language];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`http://localhost:5000/api/quizzes/${lessonId}`);
        setQuiz(res.data);
      } catch (err) {
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [lessonId, language]);

  const handleSelect = (questionId, choiceId) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let finalScore = 0;
    quiz.questions.forEach((question) => {
      const selectedChoiceId = answers[question._id];
      const selectedChoice = question.choices.find((c) => c._id === selectedChoiceId);
      if (selectedChoice && selectedChoice.isCorrect) finalScore++;
    });
    setScore(finalScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1A1614] flex flex-col items-center justify-center gap-6">
      <Loader2 className="text-amber-500 animate-spin" size={48} />
      <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-xs">{t.loading}</span>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#1A1614] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-white/60 text-xl font-bold italic">{error}</p>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 px-8 py-4 bg-amber-500 text-[#1A1614] rounded-2xl font-black uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={16} /> {t.back}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A1614] px-4 py-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-amber-500/30"></div>
            {/* LARGE SUBHEADING - Updated size and tracking */}
            <span className="text-xl md:text-3xl font-black text-amber-500 uppercase tracking-[0.3em] md:tracking-[0.6em] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
              {t.subheading}
            </span>
            <div className="h-px w-8 bg-amber-500/30"></div>
          </div>

          <h1 className={`text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter ${language === 'AM' ? 'font-sans' : 'font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70'}`}>
            {quiz.title}
          </h1>

          <AnimatePresence>
            {submitted && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#26211E] border border-amber-500/30 p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden inline-block w-full mb-12"
              >
                <Sparkles className="absolute top-6 left-6 text-amber-500/20" size={50} />
                <Trophy className="mx-auto mb-6 text-amber-500" size={80} />
                <p className="text-amber-500 font-black text-lg uppercase tracking-widest mb-4">{t.scoreLabel}</p>
                <h2 className="text-6xl md:text-9xl font-black text-white mb-6 leading-none">
                  {score} <span className="text-3xl text-white/30">/ {quiz.questions.length}</span>
                </h2>
                <p className="text-white/60 text-xl italic font-medium">
                  {score === quiz.questions.length ? t.perfect : t.good}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Questions List */}
        <div className="space-y-16">
          {quiz.questions.map((q, qIndex) => (
            <div key={q._id} className="bg-[#26211E] border border-white/5 rounded-[3.5rem] p-8 md:p-14 shadow-2xl relative transition-all duration-500 hover:border-amber-500/20">
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-[#1A1614] font-black text-xl shadow-2xl rotate-[-5deg]">
                {qIndex + 1}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-12 mt-4">
                {q.questionText}
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {q.choices.map((choice) => {
                  const isSelected = answers[q._id] === choice._id;
                  const isCorrect = choice.isCorrect;

                  let style = "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-amber-500/30";
                  
                  if (submitted) {
                    if (isSelected && isCorrect) {
                      style = "bg-green-500/20 border-green-500 text-green-400";
                    } else if (isSelected && !isCorrect) {
                      style = "bg-red-500/20 border-red-500 text-red-400";
                    } else if (isCorrect) {
                      style = "bg-green-500/10 border-green-500/40 text-green-400/60 border-dashed";
                    } else {
                      style = "bg-white/5 border-transparent opacity-20 text-white/20";
                    }
                  } else if (isSelected) {
                    style = "bg-gradient-to-r from-amber-600 to-amber-400 text-[#1A1614] border-amber-500 font-black shadow-[0_0_30px_rgba(212,175,55,0.3)]";
                  }

                  return (
                    <button
                      key={choice._id}
                      type="button"
                      onClick={() => handleSelect(q._id, choice._id)}
                      disabled={submitted}
                      className={`relative w-full text-left px-8 py-7 rounded-[2rem] border-2 transition-all duration-500 text-xl flex items-center justify-between group ${style}`}
                    >
                      <span className="font-bold">{choice.text}</span>
                      <div className="flex-shrink-0 ml-4">
                        {submitted && isSelected && isCorrect && <CheckCircle2 size={28} />}
                        {submitted && isSelected && !isCorrect && <XCircle size={28} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-24 space-y-6">
          {!submitted ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className={`w-full py-8 text-lg font-black uppercase tracking-[0.5em] rounded-[2.5rem] transition-all flex items-center justify-center gap-4 ${
                Object.keys(answers).length === 0 
                ? "bg-white/5 text-white/10 cursor-not-allowed" 
                : "bg-gradient-to-r from-amber-600 to-amber-400 text-white shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
              }`}
            >
              <ShieldCheck size={24} />
              {t.finish}
            </motion.button>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-7 bg-white/5 text-white/60 border border-white/10 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <ArrowLeft size={20} /> {t.back}
              </button>
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                }}
                className="flex-1 py-7 bg-amber-500 text-[#1A1614] rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <RotateCcw size={20} /> {t.retry}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}