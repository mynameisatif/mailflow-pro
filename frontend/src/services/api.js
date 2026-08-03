import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://mailflow-api-w8kx.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const buildAuthUrl = (path) => `${API_BASE_URL}${path}`;

export default api;
