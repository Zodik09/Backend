import { Navigate, Outlet } from "react-router";
import { isLoggedIn } from "../utils/Auth";

const PublicRoute = () => {
  return isLoggedIn() ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
