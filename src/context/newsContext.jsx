import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState('');
  const navigate = useNavigate()

  const value = {
    backendUrl ,token, setToken, navigate

    // You can later add: fetchNews, createNews, deleteNews, etc.
  };

  return (
    <NewsContext.Provider value={value}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
