import React from "react";

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <article className="featureCard">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
};

export default FeatureCard;
