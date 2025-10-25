import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => scroller.scrollTo(id, { smooth: true, offset: -80, duration: 600 }), 150);
    } else {
      scroller.scrollTo(id, { smooth: true, offset: -80, duration: 600 });
    }
    setOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    setTimeout(() => {
      scroller.scrollTo("hero", { smooth: true, offset: -80, duration: 600 });
      setOpen(false);
    }, 150);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-1">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
          />
          <div>
            <div className="text-yellow-400 font-bold text-lg md:text-2xl">Orthodox Platform</div>
            <div className="text-xs text-gray-300 -mt-1 hidden md:block">
              For Orthodox students — Connect • Learn • Serve
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-white">
          <button onClick={handleHomeClick} className="hover:text-yellow-400">Home</button>
          <button onClick={() => goToSection("about")} className="hover:text-yellow-400">About</button>
          <button onClick={() => goToSection("contact")} className="hover:text-yellow-400">Contact</button>
          <Link to="/register" className="hover:text-yellow-400">Register</Link>
          <Link to="/login" className="hover:text-yellow-400">Login</Link>
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden flex-1 flex justify-end">
          <button
            onClick={() => setOpen(v => !v)}
            className="text-yellow-400 text-3xl focus:outline-none"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/95 text-white w-full transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 text-center py-4">
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={() => goToSection("about")}>About</button>
          <button onClick={() => goToSection("contact")}>Contact</button>
          <Link to="/register" onClick={() => setOpen(false)} className="block">Register</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="block">Login</Link>
        </div>
      </div>
    </nav>
  );
}
