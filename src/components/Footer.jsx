import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // currently year

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-12 sm:h-14 w-auto rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-400 px-2 sm:px-0">
          Your Daily Dose of Movies and Entertainment.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
          <a href="http://localhost:5173/" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-gray-200 mt-2">
          © {currentYear} FilmyMeet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
