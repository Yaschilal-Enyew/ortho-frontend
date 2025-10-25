// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <>
      {/* Navbar always visible */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <ToastContainer/>

      {/* Page content below navbar */}
      <div className="pt-[72px] md:pt-[80px] bg-gray-950 text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}
