import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>Welcome to Varta</h1>
        <p className="lead">
          A lightweight demo chat app. Register or log in to start chatting with
          others. Backend authentication will be integrated separately.
        </p>

        <div className="hero-cta">
          <Link to="/register" className="btn">
            Get started
          </Link>
          <Link to="/login" style={{ marginLeft: 12 }}>
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
