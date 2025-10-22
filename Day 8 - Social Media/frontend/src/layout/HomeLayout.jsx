import React from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
       <Outlet />
    </div>
  );
};

export default Home;
