import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const backendUrl = "http://localhost:5000/api"; // replace with your backend base URL

  // Fetch paginated news
  const fetchPosts = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`${backendUrl}/news/paginates?page=${pageNumber}&limit=2`);
      const data = response.data;

      setNews(data.posts);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Pagination buttons
  const nextSlide = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const prevSlide = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  // Label helper
  const getDateLabel = (dateStr) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const newsDate = new Date(dateStr);
    if (newsDate.toDateString() === today.toDateString()) return "Today";
    if (newsDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return "Old";
  };

  return (
    <section id="news" className="py-20 bg-yellow-50 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-700 mb-12">
          Latest News
        </h2>

        <div className="flex flex-col items-center relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {news.map((item, idx) => {
              const label = getDateLabel(item.date);
              const isToday = label === "Today";

              return (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`rounded-xl overflow-hidden shadow-lg relative transition-transform transform hover:scale-105 ${
                    isToday
                      ? "bg-yellow-100 ring-2 ring-yellow-400 shadow-2xl"
                      : "bg-white"
                  }`}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-5 text-left">
                    <span
                      className={`inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full ${
                        label === "Today"
                          ? "bg-green-100 text-green-800"
                          : label === "Yesterday"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {label}
                    </span>
                    <h3 className="font-bold text-yellow-700 text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-xs text-gray-400">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <button className="text-yellow-500 font-semibold hover:underline">
                        See more
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Up/Down arrows */}
          <div className="flex gap-6 mt-8 z-30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              disabled={page === 1}
              className="bg-yellow-600 text-white p-4 rounded-full shadow-2xl hover:bg-yellow-700 transition-all ring-4 ring-yellow-300 disabled:opacity-50"
            >
              <ChevronUp size={28} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              disabled={page === totalPages}
              className="bg-yellow-600 text-white p-4 rounded-full shadow-2xl hover:bg-yellow-700 transition-all ring-4 ring-yellow-300 disabled:opacity-50"
            >
              <ChevronDown size={28} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
