import React, { useContext } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { NewsContext } from "../context/newsContext";

export default function Footer() {
  const { language } = useContext(NewsContext);

  const content = {
    EN: {
      title: "Orthodox Student Platform",
      tagline: "Empowering faith, unity, and growth among Orthodox students.",
      rights: "All Rights Reserved",
      links: ["Home", "About", "Contact"],
      heritage: "SPIRITUAL HERITAGE • CAMPUS UNITY"
    },
    AM: {
      title: "ኦርቶዶክሳዊ የተማሪዎች መድረክ",
      tagline: "በኦርቶዶክሳዊያን ተማሪዎች መካከል እምነትን፣ አንድነትን እና እድገትን ማጠናከር።",
      rights: "መብቱ በህግ የተጠበቀ ነው",
      links: ["መነሻ", "ስለ እኛ", "ያግኙን"],
      heritage: "መንፈሳዊ ቅርስ • የተማሪዎች አንድነት"
    }
  };

  const t = content[language];

  return (
    <footer className="relative bg-[#1A1614] text-[#D4AF37] py-20 overflow-hidden border-t border-[#D4AF37]/30">
      {/* Premium Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_25px_#D4AF37]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Decorative Row - LARGE TEXT */}
        <div className="flex justify-center mb-14">
          <div className="flex items-center gap-6">
             <div className="h-px w-16 bg-[#D4AF37]/30"></div>
             <span className="text-lg md:text-2xl font-black uppercase tracking-[0.5em] text-[#D4AF37] whitespace-nowrap drop-shadow-md">
               {t.heritage}
             </span>
             <div className="h-px w-16 bg-[#D4AF37]/30"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          
          {/* Left Section: Branding - LARGER TITLES */}
          <div className="text-center lg:text-left">
            <h2 className={`text-4xl md:text-5xl font-black mb-5 tracking-tighter text-white drop-shadow-lg ${language === 'AM' ? 'font-sans' : 'font-serif italic'}`}>
              {t.title}
            </h2>
            <p className="text-[#D4AF37]/80 font-bold max-w-md mx-auto lg:mx-0 leading-relaxed text-xl italic">
              {t.tagline}
            </p>
          </div>

          {/* Center Section: Social Icons - SLIGHTLY LARGER */}
          <div className="flex gap-6">
            {[
              { Icon: FaFacebookF, link: "https://facebook.com" },
              { Icon: FaInstagram, link: "https://instagram.com" },
              { Icon: FaYoutube, link: "https://youtube.com" },
              { Icon: FaTiktok, link: "https://tiktok.com" },
            ].map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]"></div>
                <Icon className="relative z-10 text-2xl group-hover:text-[#1A1614] transition-colors" />
              </a>
            ))}
          </div>

          {/* Right Section: Navigation - LARGE BOLD LINKS */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            <div className="flex flex-wrap justify-center gap-10 text-lg md:text-xl font-black uppercase tracking-[0.3em]">
              {t.links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={`#${['home', 'about', 'contact'][idx]}`} 
                  className="hover:text-white transition-colors relative group"
                >
                  {link}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-500 rounded-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar - LARGER SECONDARY TEXT */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-black uppercase tracking-[0.3em] text-[#D4AF37]/50">
          <p>
            &copy; {new Date().getFullYear()} {t.title} — {t.rights}
          </p>
          <div className="flex items-center gap-3">
            <Sparkles size={18} />
            <span className="text-white/60">Excellence in Service</span>
            <Sparkles size={18} />
          </div>
        </div>
      </div>

      {/* Subtle Side Glows */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
    </footer>
  );
}