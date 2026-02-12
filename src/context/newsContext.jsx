import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  
  // --- LANGUAGE STATE ---
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "EN");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  // --- LANGUAGE TOGGLE FUNCTION ---
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const value = {
    backendUrl,
    token,
    setToken,
    navigate,
    logout,
    language,       // Exported to use in UI
    changeLanguage, // Exported to use in Navbar
  };

  return (
    <NewsContext.Provider value={value}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;