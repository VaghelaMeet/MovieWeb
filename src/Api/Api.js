const apiKey = import.meta.env.VITE_MOVIE_KEY; // Enter Your Key

const Api1 = "https://imdb236.p.rapidapi.com/api/imdb/top250-movies"; // Top-250 Movies

export const fetchMovie = async () => {
  try {
    let res = await fetch(Api1, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log("Not Fetch Movies");
  }
};

const Api2 = "https://imdb236.p.rapidapi.com/api/imdb"; // Movie Details

export const fetchMovieDetail = async (id) => {
  try {
    let res = await fetch(`${Api2}/${id}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log("Not Fetch MovieDetail");
  }
};

const Api3 = "https://imdb236.p.rapidapi.com/api/imdb/search"; // Movie Filter

export const fetchGenre = async (genre) => {
  try {
    let res = await fetch(
      `${Api3}?type=movie&genre=${genre}&rows=25&sortOrder=ASC&sortField=id`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
        },
      }
    );
    let data = await res.json();
    return data;
  } catch (err) {
    console.log("Not Fetch genres");
  }
};

const Api4 = "https://imdb236.p.rapidapi.com/api/imdb/top250-tv"; // TV Show

export const fetchTVshow = async () => {
  try {
    let res = await fetch(Api4, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.error("Not Fetch TV show", err);
    return [];
  }
};

const Api5 = "https://imdb236.p.rapidapi.com/api/imdb"; // TVShow Details

export const fetchTVshowDetail = async (id) => {
  try {
    let res = await fetch(`${Api5}/${id}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log("Not Fetch TVshowDetail");
  }
};

const Api6 = "https://imdb236.p.rapidapi.com/api/imdb/autocomplete"; // Search Option

export const fetchSearch = async (searchQuery) => {
  try {
    let res = await fetch(`${Api6}?query=${encodeURIComponent(searchQuery)}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
      },
    });
    let data = await res.json();
    return data;
  } catch (err) {
    console.log("Not Fetch SearchOption", err);
    return [];
  }
};
