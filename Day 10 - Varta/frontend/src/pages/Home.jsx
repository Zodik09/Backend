import React, { useState } from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import "../styles/home.css";

const Home = () => {
  const features = [
    {
      icon: "💬",
      title: "Real-time chat",
      desc: "Fast and reliable messaging with socket-based updates.",
    },
    {
      icon: "🤖",
      title: "AI assistant",
      desc: "Ask the built-in AI for summaries, suggestions, or creative replies.",
    },
    {
      icon: "🔒",
      title: "Secure by default",
      desc: "Token-based auth with cookie support and protected routes.",
    },
  ];

  return (
    <>
      <section className="home">
        <Hero />
        <div className="featureGrid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            ></FeatureCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
