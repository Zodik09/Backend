import { Routes, Route, Navigate } from "react-router";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AuthLayout from "../layout/AuthLayout";
import HomeLayout from "../layout/HomeLayout";
import Hero from "../components/Hero";
import Posts from "../pages/Posts";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Routers = () => {
  return (
    <Routes>
      {/* Redirect root (/) to /auth */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* ---------- AUTH ROUTES ---------- */}
      <Route element={<PublicRoute />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Hero />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>

      {/* Protected Home routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Profile />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
