import React, { useState, useEffect } from "react";
import { fetchMovieDetail } from "../Api/Api";
import { useParams } from "react-router-dom";

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full mt-61 h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
  </div>
);

const MovieDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const MovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetail(id);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setLoading(false);
    };
    MovieDetails();
  }, [id]);

  if (loading) return <Loader />;

  const videoId = details?.trailer?.split("v=")[1]?.split("&")[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        {details?.primaryTitle}
      </h1>

      {/* Info */}
      <div className="flex flex-wrap gap-2 text-gray-500 text-sm sm:text-base mb-4">
        <span>{details?.startYear}</span>
        <span>•</span>
        <span>{details?.contentRating}</span>
        <span>•</span>
        <span>
          {Math.floor(details?.runtimeMinutes / 60)}h{" "}
          {details?.runtimeMinutes % 60}m
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={details?.primaryImage}
          alt={details?.primaryTitle}
          className="w-full md:w-72 h-auto md:h-96 rounded-xl object-cover"
        />

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-base sm:text-lg text-gray-800">
              {details?.description}
            </p>
          </div>

          {/* Rating */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Rating</h2>
            <p className="text-lg font-semibold">
              ⭐ {details?.averageRating || "N/A"}
            </p>
          </div>

          {/* Genres */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {details?.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-300 px-3 py-1 rounded-2xl text-sm sm:text-base"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {videoId && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Trailer</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              src={embedUrl}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Director */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-2xl font-bold">Director</h2>
        <p className="bg-gray-200 px-4 py-1 rounded-2xl">
          {details?.directors[0]?.fullName}
        </p>
      </div>

      {/* Writers */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-bold w-full sm:w-auto">Writers</h2>
        {details?.writers?.map((w, i) => (
          <p key={i} className="bg-gray-200 px-3 py-1 rounded-2xl text-base">
            {w.fullName}
          </p>
        ))}
      </div>

      {/* Cast */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-bold w-full sm:w-auto">Star</h2>
        {details?.cast?.slice(0, 4).map((actor, i) => (
          <p key={i} className="bg-gray-200 px-3 py-1 rounded-2xl text-base">
            {actor.fullName}
          </p>
        ))}
      </div>

      {/* Streaming */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Streaming</h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.primevideo.com" target="_blank">
            <img
              src="/primevideo.png"
              alt="Prime Video"
              className="h-20 w-auto rounded-2xl"
            />
          </a>
          <a href="https://www.jiohotstar.com" target="_blank">
            <img
              src="/jiohotstar.png"
              alt="JioHotstar"
              className="h-20 w-auto rounded-2xl"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
