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
      const response = await axios.get(
        `${backendUrl}/news/paginates?page=${pageNumber}&limit=2`
      );
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
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (page > 1) setPage((prev) => prev - 1);
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
    <section id="news" className="py-24 bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-yellow-700 mb-20 tracking-tight"
        >
          Latest News & Updates
        </motion.h2>

        <div className="flex flex-col items-center relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full">
            {news.map((item, idx) => {
              const label = getDateLabel(item.date);
              const isToday = label === "Today";

              return (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`group overflow-hidden rounded-3xl shadow-xl border border-gray-200 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 bg-white ${
                    isToday ? "ring-2 ring-yellow-400" : ""
                  }`}
                >
                  {item.image && (
                    <div className="overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  )}

                  <div className="p-8 text-left">
                    <span
                      className={`inline-block mb-4 px-4 py-1.5 text-sm font-semibold rounded-full ${
                        label === "Today"
                          ? "bg-green-100 text-green-700"
                          : label === "Yesterday"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {label}
                    </span>

                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-yellow-700 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-base mt-4 leading-relaxed line-clamp-4">
                      {item.description}
                    </p>

                    <div className="mt-6 flex justify-between items-center border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-400">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      <button className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors text-base">
                        Read More →
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Up/Down arrows */}
          <div className="flex gap-10 mt-16">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              disabled={page === 1}
              className="bg-yellow-500 text-white p-5 rounded-full shadow-xl hover:bg-yellow-600 transition disabled:opacity-40"
            >
              <ChevronUp size={30} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              disabled={page === totalPages}
              className="bg-yellow-500 text-white p-5 rounded-full shadow-xl hover:bg-yellow-600 transition disabled:opacity-40"
            >
              <ChevronDown size={30} />
            </motion.button>
          </div>

          <p className="text-base text-gray-500 mt-8">
            Page {page} of {totalPages}
          </p>
        </div>
      </div>
    </section>
  );
}
