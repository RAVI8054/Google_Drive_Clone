// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // if not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // otherwise → render page
  return children;
}
