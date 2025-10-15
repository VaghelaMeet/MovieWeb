import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { fetchGenre, fetchMovie } from "../Api/Api";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filterMovie, setFilterMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovie();
      setMovies(data);
      setFilterMovie(data);
      setLoading(false);
    };
    loadMovies();
  }, []);

  const genres = [
    "Drama", "Comedy", "Documentary", "Action", "Romance", "Thriller",
    "Crime", "Horror", "Adventure", "Family", "Animation", "Reality-TV",
    "Mystery", "Music", "Talk-Show", "Fantasy", "History", "Biography",
    "Sci-Fi", "Sport", "Musical", "Adult", "War", "News", "Game-Show",
    "Western", "Short", "Film-Noir",
  ];

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleGenreSubmit = async () => {
    setShowModal(false);
    setLoading(true);

    if (selectedGenres.length === 0) {
      setFilterMovie(movies);
      setLoading(false);
      return;
    }

    try {
      const res = await Promise.all(
        selectedGenres.map((genre) => fetchGenre(genre))
      );
      const mixMovie = res
        .flatMap((r) => r?.results || [])
        .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

      setFilterMovie(mixMovie);
    } catch (error) {
      console.log("Cannot fetch genre movies", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black">
          🎬 Top Movies
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl flex items-center gap-2 bg-blue-500 p-2 px-4 text-white cursor-pointer hover:bg-blue-600 transition"
        >
          <IoFilter className="text-xl sm:text-2xl" />
          <span className="text-sm sm:text-base font-medium">Filter</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400">
                Select Genres
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white text-lg w-8 h-8 flex items-center justify-center rounded-full hover:text-red-500 hover:bg-gray-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {genres.map((genre, i) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <button
                    key={i}
                    onClick={() => toggleGenre(genre)}
                    className={`cursor-pointer px-3 py-1 text-sm sm:text-base rounded-lg font-medium transition-all ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleGenreSubmit}
                className="text-white px-5 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full mt-21 h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        /* Movie Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
          {filterMovie.map((item, i) => (
            <div
              key={item.id || i}
              className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform flex flex-col"
            >
              <img
                src={item.primaryImage}
                alt={item.primaryTitle}
                className="w-full h-56 sm:h-64 md:h-72 object-cover"
              />
              <div className="p-3 flex flex-col flex-1">
                <p className="text-sm text-yellow-400 mb-1">
                  ⭐ {item.averageRating || "N/A"}
                </p>
                <h1 className="font-semibold text-base sm:text-lg mb-2 line-clamp-1">
                  {item.primaryTitle}
                </h1>
                <button
                  onClick={() => navigate(`/movie/${item.id}`)}
                  className="bg-blue-500 text-white text-sm sm:text-base py-2 rounded-lg mt-auto cursor-pointer hover:bg-blue-600 transition"
                >
                  Watch
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
