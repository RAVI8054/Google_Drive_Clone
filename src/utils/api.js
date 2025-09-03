const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const api = {
  post: async (path, body, token) => {
    const res = await fetch(`${API_BASE}${path}`, {
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
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.json();
  },

  postForm: async (path, formData, token) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.json();
  },
};
