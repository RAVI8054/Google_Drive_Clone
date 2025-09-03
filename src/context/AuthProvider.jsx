import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from token at startup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  async function signup(data) {
    const res = await api.post("/auth/signup", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    toast.success("Signup successful");
  }

  async function login(data) {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    toast.success("Login successful");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
