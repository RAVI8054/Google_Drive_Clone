// src/utils/api.js

// Base URL of your backend API
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Centralized API endpoints
export const endpoints = {
  signup: "/auth/signup",
  login: "/auth/login",
  logout: "/auth/logout", // optional if backend supports
  folders: "/folders",
  images: "/images",
  searchImages: (query) => `/images/search?query=${encodeURIComponent(query)}`,
};

// (Optional) helper for fetch-based requests
export const api = {
  post: async (path, body, token) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  get: async (path, token) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.json();
  },
};
