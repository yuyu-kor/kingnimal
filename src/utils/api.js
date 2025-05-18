import axios from "axios";

const api = axios.create({
  baseURL: "https://api.inaturalist.org/v1",
});

export default api;
