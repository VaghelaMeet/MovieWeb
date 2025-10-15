import React, { useState, useEffect } from "react";
import { fetchTVshow } from "../Api/Api";
import { useNavigate } from "react-router-dom";

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
  </div>
);

const TVshow = () => {
  const [TV, setTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const TVshows = async () => {
      setLoading(true);
      try {
        const data = await fetchTVshow();
        setTV(data);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
      setLoading(false);
    };
    TVshows();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
        🎬 TV Shows
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {TV.map((item, i) => (
          <div
            key={item.id || i}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform flex flex-col"
          >
            <img
              src={item.primaryImage}
              alt={item.primaryTitle}
              className="w-full h-full sm:h-64 md:h-72 object-cover"
            />
            <div className="p-3 flex flex-col flex-1">
              <p className="text-sm sm:text-base text-yellow-400 mb-1">
                ⭐ {item.averageRating || "N/A"}
              </p>
              <h1 className="font-semibold text-base sm:text-lg text-white line-clamp-1">
                {item.primaryTitle}
              </h1>
              <button
                onClick={() => navigate(`/tv/${item.id}`)}
                className="bg-blue-500 text-white text-sm sm:text-base py-2 rounded-lg mt-auto hover:bg-blue-600 transition"
              >
                Watch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVshow;
