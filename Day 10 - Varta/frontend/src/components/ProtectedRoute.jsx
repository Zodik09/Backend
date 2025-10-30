import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  try {
    // check common keys that backends or previous flows might use
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("currentUser");
    return Boolean(token || user);
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
