import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ProtectedRoute from "./utils/ProtectedRoute";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { checkedAuth, checkAuth } = useAuth();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth({
        redirectToChat:
          (location.pathname === "/" || location.pathname === "/login") &&
          !hasRedirected.current,
      });
      hasRedirected.current = true;
    };
    initAuth();
  }, []); // run only once

  if (!checkedAuth) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
