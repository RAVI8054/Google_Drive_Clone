// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { getToken, logout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token }); // you can decode token if needed
    }
  }, []);

  const loginUser = (data) => {
    setUser({ token: data.token, user: data.user });
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
