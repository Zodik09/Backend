import { useState } from "react";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";

function LogIn() {
   const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/login", loginForm)
      .then((response) => {
        console.log("✅ Server Response:", response.data.message);
        setLoginForm({ email: "", password: "" });
        alert("Form submitted successfully!");
          navigate("/home");
      })
      .catch((error) => {
        console.error("❌ Error while login:", error.response.data.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          placeholder="E-mail"
          autoComplete="current-email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LogIn;
