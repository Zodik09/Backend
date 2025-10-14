import React from "react";
import { Link } from "react-router-dom";
// import brain from "../assets/brain.png";
// import speaker from "../assets/speaker.png";
import model from "../assets/ourModel1.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="left">
        <h1>
          Show your next you <br /> <span>like never before.</span>
        </h1>
        <p>
          Ever wish your pictures could talk?{" "}
          <span>
            Stop worrying about what to <br /> say—let Loom do the talking.
          </span>{" "}
          Every photo, every moment, every <br /> bit of your personality is{" "}
          <span>
            amplified with AI-powered captions <br />{" "}
          </span>{" "}
          crafted just for you. No overthinking, no struggling—just snap, <br />{" "}
          post, and show the next version of yourself effortlessly, <br />{" "}
          <span>every single time.</span>
        </p>
        <Link to="/posts" className="postsBtn">
          <span>Create Post</span>
        </Link>
      </div>
      <div className="right">
        <img src={model} alt="Hero Model Girl"/>
        {/* <img src={speaker} alt="Hero Model Girl" className="speaker"/>
        <img src={brain} alt="Hero Model Girl" className="brain"/> */}
      </div>
    </div>
  );
};

export default Hero;
