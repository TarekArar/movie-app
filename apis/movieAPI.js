import api from "./configs/axiosConfig";

export const MovieAPI = {
  getGenres: function () {
    return api.get("/genre/movie/list");
  },
  getMovies: function (page?: string) {
    return api.get("list/1?page=1");
  },
};
