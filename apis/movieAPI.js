import api from "./configs/axiosConfig";

export const MovieAPI = {
  getGenres: function () {
    return api.get("/genre/movie/list");
  },
  getMovies: function (query = "", page = 1) {
    if (!query)
      return api.get(`/discover/movie?page=${page}&&include_adult=false`);

    return api.get(
      `/search/movie?query=${query}&&page=${page}&&include_adult=false`
    );
  },
  getMovie: function (id) {
    return api.get(`/movie/${id}`);
  },
  getMovieCrew: function (id) {
    return api.get(`/movie/${id}/credits`);
  },
  getMoviesByGenre: function (genreId) {
    return api.get(`/list/${genreId}`);
  },
  getMovieVideos: function (id) {
    return api.get(`/movie/${id}/videos`);
  },
};
