import api from "./configs/axiosConfig";

export const MovieAPI = {
  getGenres: function () {
    return api.get("/genre/movie/list");
  },
  getMovies: function (query = "", page = 1) {
    if (!query) return api.get(`/discover/movie?page=${page}`);

    return api.get(`/search/movie?query=${query}&&page=${page}`);
  },
  getMovie: function (id) {
    return api.get(`/movie/${id}`);
  },
  getMovieCrew: function (id) {
    return api.get(`/movie/${id}/credits`);
  },
};
