import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/">Varta</Link>
      </div>
      <div className="nav-right">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/chat">Chat</Link>
      </div>
    </header>
  );
};

export default Header;
