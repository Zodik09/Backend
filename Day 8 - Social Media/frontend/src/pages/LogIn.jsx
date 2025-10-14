import { useState } from "react";
import Navbar from "../components/Navbar";

function LogIn() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.username]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      console.log("Server Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
     <div><Navbar />
    <form onSubmit={handleSubmit}>
      <input username="username" value={loginForm.username} onChange={handleChange} placeholder="username" />
      <br />
      <input username="password" value={loginForm.password} onChange={handleChange} placeholder="password" />
      <br />
      <button type="submit">LogIn</button>
    </form></div>
  );
}

export default LogIn;
