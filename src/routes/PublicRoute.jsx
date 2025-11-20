// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />; // Show spinner while Firebase checks user

  return user ? <Navigate to="/" replace /> : children;
}

