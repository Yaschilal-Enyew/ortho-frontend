import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "../assets/orthodox.png";
import { toast } from "react-toastify";
import axios from "axios";
import { NewsContext } from "../context/newsContext";
import { Lock, Mail, ShieldCheck, Sparkles, ArrowRight, Languages } from "lucide-react";

export default function Login() {
  const [lang, setLang] = useState("EN");
  const [form, setForm] = useState({ email: "", password: "" });

  const { token, setToken, backendUrl, navigate } = useContext(NewsContext);

  // Translation Dictionary
  const texts = {
    EN: {
      badge: "Secure Access",
      title: "Student",
      subtitle: "Login",
      email: "Email Address",
      pass: "Password",
      btn: "Authorize Entry",
      footer: "New here?",
      link: "Create Account",
      heroTitle: "Welcome",
      heroSub: "Back",
      heroDesc: "Continue your journey where faith meets education.",
      success: "Logged in Successfully"
    },
    AM: {
      badge: "ደህንነቱ የተጠበቀ መግቢያ",
      title: "የተማሪዎች",
      subtitle: "መግቢያ",
      email: "ኢሜይል",
      pass: "የይለፍ ቃል",
      btn: "ፍቃድ አግኝና ግባ",
      footer: "አዲስ ነዎት?",
      link: "አካውንት ይፍጠሩ",
      heroTitle: "እንኳን ደህና",
      heroSub: "መጡ",
      heroDesc: "ሃይማኖት ከእውቀት ጋር የሚገናኝበትን ጉዞዎን ይቀጥሉ::",
      success: "በተሳካ ሁኔታ ገብተዋል"
    }
  };

  const t = texts[lang];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const response = await axios.post(`${backendUrl}/user/login`, { email, password });

      if (response.data.success) {
        const userToken = response.data.token;
        toast.success(t.success);
        setToken(userToken);
        localStorage.setItem("token", userToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] overflow-hidden selection:bg-amber-500/30">
      
      {/* LEFT SIDE — LOGIN FORM */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6 md:p-12 order-2 md:order-1 relative"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glow effect */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-600/10 blur-[120px] rounded-full -z-10" />

        <div className="w-full max-w-md bg-[#0D0D0D] border border-white/5 p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          {/* LANGUAGE TOGGLE */}
          <div className="absolute top-6 right-8 z-20">
            <button 
              onClick={() => setLang(lang === "EN" ? "AM" : "EN")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-500 hover:bg-white/10 transition-all active:scale-95"
            >
              <Languages size={14} />
              <span className="text-[10px] font-black tracking-widest uppercase">{lang === "EN" ? "አማርኛ" : "English"}</span>
            </button>
          </div>

          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl mb-4 border border-amber-500/20">
              <ShieldCheck className="text-amber-500" size={28} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              {t.title} <span className="text-amber-500 font-light italic">{t.subtitle}</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">{t.badge}</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">{t.email}</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="admin@email.com"
                  className="w-full pl-12 pr-6 py-4 bg-white/[0.03] text-slate-200 placeholder-slate-600 border border-white/5 rounded-2xl outline-none focus:border-amber-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-amber-500/5 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">{t.pass}</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-white/[0.03] text-slate-200 placeholder-slate-600 border border-white/5 rounded-2xl outline-none focus:border-amber-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-amber-500/5 transition-all duration-300"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#d97706" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-amber-600 text-black font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl shadow-xl shadow-amber-900/20 mt-4 flex items-center justify-center gap-3 group transition-all"
            >
              {t.btn} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <p className="text-center mt-10 text-slate-500 text-xs font-bold">
            {t.footer} <span onClick={() => navigate('/register')} className="text-amber-500 cursor-pointer hover:underline decoration-amber-500/30 underline-offset-4">{t.link}</span>
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE — IMAGE VISUAL */}
      <motion.div className="flex-1 relative order-1 md:order-2 h-80 md:h-auto overflow-hidden">
        <img src={heroImage} alt="Orthodox Visual" className="w-full h-full object-cover grayscale-[0.2] brightness-[0.6]" />
        
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />

        <div className="absolute bottom-12 left-12 right-12">
          <AnimatePresence mode="wait">
            <motion.div 
              key={lang}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="h-[1px] w-16 bg-amber-500" />
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                {t.heroTitle} <br />
                <span className="text-amber-500 font-light italic">{t.heroSub}</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-lg max-w-xs leading-relaxed font-medium">
                {t.heroDesc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}