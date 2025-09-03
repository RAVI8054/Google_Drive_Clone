import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api"; // create helper

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    }
    return { ok: false, message: res.message };
  };

  const register = async (email, password, name) => {
    const res = await api.post("/auth/register", { email, password, name });
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      return { ok: true };
    }
    return { ok: false, message: res.message };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
