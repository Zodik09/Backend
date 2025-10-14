// ✅ Clean version — no useRoutes
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default Router;