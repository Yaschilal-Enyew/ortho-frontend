import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import logo from "../assets/logo.png";
import { NewsContext } from "../context/newsContext";

export default function Navbar() {
  const { token, logout, language, changeLanguage } = useContext(NewsContext);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const langRef = useRef(null);

  const content = {
    EN: {
      home: "Home",
      about: "About",
      courses: "Courses",
      contact: "Contact",
      tagline: "Connect • Learn • Serve",
      login: "Sign In",
      register: "Join Now",
      logout: "Log Out",
      platform: "Orthodox",
      sub: "Platform"
    },
    AM: {
      home: "መነሻ",
      about: "ስለ እኛ",
      courses: "ኮርሶች",
      contact: "መገናኛ",
      tagline: "ይገናኙ • ይማሩ • ያገልግሉ",
      login: "ግባ",
      register: "ተመዝገብ",
      logout: "ውጣ",
      platform: "ኦርቶዶክሳዊ",
      sub: "መድረክ"
    }
  };

  const t = content[language];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scroller.scrollTo(id, { smooth: true, offset: -80, duration: 600 }), 150);
    } else {
      scroller.scrollTo(id, { smooth: true, offset: -80, duration: 600 });
    }
    setOpen(false);
  };

  // --- PREMIUM BOLD CLASSES ---
  const navItemClass = "relative px-4 py-2 text-white text-sm font-bold tracking-wider transition-all duration-300 hover:text-amber-400 group uppercase";
  const underline = "absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(245,158,11,0.8)]";

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] border-b border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Brand/Logo */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600 to-yellow-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img src={logo} alt="logo" className="relative w-11 h-11 rounded-full object-cover border-2 border-amber-500/50 p-0.5 bg-black" />
          </div>
          <div>
            <div className={`text-white font-black text-2xl leading-none tracking-tighter ${language === "AM" ? 'font-sans' : 'font-serif italic'}`}>
              {t.platform}<span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent ml-1">{t.sub}</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-amber-500/80 font-bold mt-1 hidden md:block">{t.tagline}</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-2">
            <button onClick={() => goToSection("hero")} className={navItemClass}>{t.home}<span className={underline}></span></button>
            <button onClick={() => goToSection("about")} className={navItemClass}>{t.about}<span className={underline}></span></button>
            <Link to="/courses" className={navItemClass}>{t.courses}<span className={underline}></span></Link>
            <button onClick={() => goToSection("contact")} className={navItemClass}>{t.contact}<span className={underline}></span></button>
          </ul>

          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2"></div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-amber-500/30 text-xs font-black text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300">
              {language} <span className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-4 w-36 rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/20">
                <button onClick={() => { changeLanguage("EN"); setLangOpen(false); }} className="w-full px-5 py-4 text-left text-xs font-bold text-gray-200 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black transition-all">ENGLISH</button>
                <button onClick={() => { changeLanguage("AM"); setLangOpen(false); }} className="w-full px-5 py-4 text-left text-xs font-bold text-gray-200 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black transition-all">አማርኛ (AM)</button>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          {token ? (
            <button 
              onClick={logout} 
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.5)]"
            >
              {t.logout}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white text-xs font-bold uppercase tracking-widest hover:text-amber-400 transition-colors">{t.login}</Link>
              <Link to="/register" className="px-7 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-amber-500/20">{t.register}</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden relative p-2 group">
          <div className="absolute inset-0 bg-amber-500/20 rounded-lg blur group-hover:opacity-100 opacity-0 transition"></div>
          <span className="relative text-amber-500 text-3xl font-bold">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-neutral-950/95 backdrop-blur-3xl transition-all duration-700 ease-in-out overflow-hidden ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col items-center gap-8 py-16 px-6">
          <button onClick={() => {goToSection("hero"); setOpen(false)}} className="text-2xl text-white font-bold uppercase tracking-widest hover:text-amber-500 transition">{t.home}</button>
          <button onClick={() => {goToSection("about"); setOpen(false)}} className="text-2xl text-white font-bold uppercase tracking-widest hover:text-amber-500 transition">{t.about}</button>
          <Link to="/courses" onClick={() => setOpen(false)} className="text-2xl text-white font-bold uppercase tracking-widest hover:text-amber-500 transition">{t.courses}</Link>
          <button onClick={() => {goToSection("contact"); setOpen(false)}} className="text-2xl text-white font-bold uppercase tracking-widest hover:text-amber-500 transition">{t.contact}</button>
          
          <div className="w-full h-[1px] bg-white/10 my-4"></div>
          
          <div className="flex gap-6">
            <button onClick={() => {changeLanguage("EN"); setOpen(false)}} className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-black transition-all ${language === "EN" ? "bg-amber-500 border-amber-500 text-black scale-110 shadow-lg shadow-amber-500/40" : "text-white border-white/20"}`}>EN</button>
            <button onClick={() => {changeLanguage("AM"); setOpen(false)}} className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-black transition-all ${language === "AM" ? "bg-amber-500 border-amber-500 text-black scale-110 shadow-lg shadow-amber-500/40" : "text-white border-white/20"}`}>AM</button>
          </div>

          {token && (
            <button onClick={() => {logout(); setOpen(false)}} className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-black uppercase tracking-[0.2em] shadow-xl">
              {t.logout}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}