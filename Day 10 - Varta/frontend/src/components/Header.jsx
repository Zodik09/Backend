import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
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
        {/* <Link className="navLink" to="/chat">Chat</Link> */}
      </div>
    </header>
  );
};

export default Header;
