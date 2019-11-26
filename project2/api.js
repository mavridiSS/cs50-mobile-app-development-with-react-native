const API_KEY = "73033226";

export const searchMovies = async (movieTitle, page = 1) => {
  const url = `http://www.omdbapi.com/?s=${movieTitle}&plot=full&apikey=${API_KEY}&page=${page}`;
  const response = await fetch(url);
  const result = await response.json();
  return {
    movies: result.Search,
    totalResults: Number(result.totalResults)
  };
};

export const getMovie = async imdbId => {
  const response = await fetch(
    `http://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${API_KEY}`
  );
  const result = await response.json();
  return result;
};
