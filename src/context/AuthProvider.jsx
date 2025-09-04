// src/context/AuthProvider.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../utils/api";

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // keep user in localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // keep token in localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res?.token) {
        setToken(res.token);
        setUser(res.user || null);
        return { ok: true, token: res.token, user: res.user };
      }
      return { ok: false, message: res?.message || "Login failed" };
    } catch (e) {
      return { ok: false, message: e?.message || "Login failed" };
    }
  };

  const register = async (email, password, name) => {
    try {
      const res = await api.post("/auth/signup", { email, password, name });
      if (res?.token) {
        setToken(res.token);
        setUser(res.user || null);
        return { ok: true, token: res.token, user: res.user };
      }
      return { ok: false, message: res?.message || "Signup failed" };
    } catch (e) {
      return { ok: false, message: e?.message || "Signup failed" };
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
