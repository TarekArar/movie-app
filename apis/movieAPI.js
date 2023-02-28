import api from "./configs/axiosConfig";

export const MovieAPI = {
  getGenres: function () {
    return api.get("/genre/movie/list");
  },
  getMovies: function (genreId) {
    return api.get(`/list/${genreId}`);
  },
  getMovie: function (id) {
    return api.get(`/movie/${id}`);
  },
  getMovieCrew: function (id) {
    return api.get(`/movie/${id}/credits`);
  },
};
