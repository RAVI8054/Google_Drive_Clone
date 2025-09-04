// src/services/authService.js
import axiosInstance from "../utils/axiosInstance"; 
import { endpoints } from "../utils/api";     

export const signup = async (userData) => {
  const res = await axios.post(endpoints.signup, userData);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(endpoints.login, credentials);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");
