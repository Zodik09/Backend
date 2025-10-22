import { Navigate, Outlet } from "react-router";
import { isLoggedIn } from "../utils/Auth";

const ProtectedRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
