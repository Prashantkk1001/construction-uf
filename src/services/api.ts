import axios from "axios";

const api = axios.create({
  baseURL: "https://construction-backend-wtf2.onrender.com/api", // backend URL
});

export default api;
