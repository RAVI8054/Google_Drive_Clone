import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE ||
  "https://google-drive-backend-74dm.onrender.com/api"; // <-- correct backend link

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // optional, if you use cookies/session
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
