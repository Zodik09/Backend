import React from "react";
import { Link } from "react-router-dom";
// import "../styles/home.css";

const Navbar = () => {
  const button = [
    {
      to: "/auth/login",
      text: "Log In",
      className: "login authButton",
    },
    {
      to: "/auth/register",
      text: "Sign Up",
      className: "register authButton",
    },
  ];

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        LooM
      </Link>
      <div className="auth">
        {
          button.map((btn, index) => (
            <Link to={btn.to} className={btn.className} key={index}>
              <span>{btn.text}</span>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Navbar;
