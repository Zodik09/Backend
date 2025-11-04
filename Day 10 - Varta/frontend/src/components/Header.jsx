import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import instance from "../utils/Router";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await instance.get("/auth/logout");
    navigate("/login");
  };
  return (
    <header className="nav">
      <div className="navLeft">
        <Link to="/" className="logo">
          Varta
        </Link>
      </div>
      <div className="navRight">
        <Link className="navLink" to="/login">
          Login
        </Link>
        <Link className="navLink" to="/register">
          Register
        </Link>
        <button onClick={handleLogout}>Logout</button>
        {/* <Link className="navLink" to="/chat">Chat</Link> */}
      </div>
    </header>
  );
};

export default Header;
