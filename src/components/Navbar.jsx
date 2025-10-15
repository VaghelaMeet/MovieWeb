import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchSearch } from "../Api/Api";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) handleSearch(query);
      else {
        setResults([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = async (searchTerm) => {
    const data = await fetchSearch(searchTerm);
    setResults(data);
    setShowSuggestions(true);
  };

  const handleSelectItem = (item) => {
    setQuery("");
    setShowSuggestions(false);

    if (item?.titleType?.includes("tv")) navigate(`/tv/${item.id}`);
    else navigate(`/movie/${item.id}`);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "movie") navigate("/");
    else if (value === "tv") navigate("/tv");
  };

  return (
    <div className="relative h-20 bg-black flex justify-between items-center px-4 md:px-8 z-50">
      {/* Logo */}
      <div>
        <img
          src="/logo.png"
          alt="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-12 w-auto rounded-xl cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex items-center gap-3 w-[500px] max-w-full">
        <select
          onChange={handleSelectChange}
          className="bg-black text-white border-2 border-white p-2 rounded-lg hover:border-violet-500 transition-colors"
        >
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>

        <div className="flex items-center p-3 border-2 border-white hover:border-violet-500 h-10 rounded-xl w-full transition-colors">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:outline-none text-white bg-black w-full text-sm"
          />
          <FiSearch className="size-5 text-white hover:text-orange-500 ml-2 cursor-pointer" />
        </div>

        <IoMdContact className="size-15 text-white cursor-pointer hover:text-orange-500 transition-colors" />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <FiSearch
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl cursor-pointer hover:text-orange-400 transition-colors"
        />
        <IoMdContact className="text-white text-3xl cursor-pointer" />
      </div>

      {/* Mobile Search Panel */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-black border-t border-gray-700 p-4 flex flex-col gap-3 md:hidden z-50">
          <select
            onChange={handleSelectChange}
            className="bg-black text-white border border-white p-2 rounded-lg hover:border-violet-500"
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>

          <div className="flex items-center border border-white rounded-xl p-2">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="focus:outline-none text-white bg-black w-full text-sm"
            />
            <FiSearch className="text-white ml-2 text-lg" />
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90%] md:w-[500px] bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="p-2 hover:bg-gray-200 cursor-pointer border-b text-sm md:text-base"
              >
                {item.primaryTitle}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500 text-sm text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
