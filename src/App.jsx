import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";
import TVshow from "./components/TVshow";
import TVshowDetail from "./components/TVshowDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow ">
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/tv" element={<TVshow />} />
              <Route path="/tv/:id" element={<TVshowDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
