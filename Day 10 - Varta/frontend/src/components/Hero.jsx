import React from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";

/**
 * Hero component
 * Renders the main landing hero: heading, brief description, and CTAs.
 * Props: none (static content for now).
 */
const Hero = () => {
  return (
    <div className="hero">
      <h1>
        Varta <span>— Conversational AI Chat</span>
      </h1>
      <p className="para">
        A modern, lightweight chat demo. Create an account to start private
        conversations, see message history, and explore AI-enhanced replies.
      </p>

      <div className="heroCTA">
        <Link to="/register" className="btn primaryBtn">
          Get started
        </Link>
        <Link to="/login" className="btn secondaryBtn">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Hero;
