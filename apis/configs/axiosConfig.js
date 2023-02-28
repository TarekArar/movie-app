import axios from "axios";

const API_KEY = "8cfd599fef09b42009b2d9213645f496";
const API_URL = "https://api.themoviedb.org/3";

// initializing the axios instance with custom configs
const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export default api;
