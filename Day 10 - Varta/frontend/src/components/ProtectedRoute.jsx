import React from "react";
import { Navigate } from "react-router-dom";

// simple cookie reader for client-side code
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .map((c) => c.split("="))
    .find(([k]) => k === name);
  return match ? decodeURIComponent(match[1]) : null;
};

// ProtectedRoute: only check that a token cookie exists. If absent, redirect to /login.
const ProtectedRoute = ({ children }) => {
  const token = getCookie("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
