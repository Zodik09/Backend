import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/Axios";

function Register() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/register", registerForm)
      .then((response) => {
        console.log("✅ Server Response:", response.data.message);
        setRegisterForm({ username: "", password: "" });
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("❌ Error submitting form:", error.response.data.message);
      });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={registerForm.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="current-username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={registerForm.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
        />

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
