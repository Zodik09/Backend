import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/Axios";

function Register() {
  const [form, setForm] = useState({
    profilePicture: null,
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Simplified conditional
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      const { data } = await axios.post("/api/auth/register", formData);

      console.log("✅ Server Response:", data?.message || "Registered successfully");
      alert("Form submitted successfully!");

      // Reset form
      setForm({
        profilePicture: null,
        name: "",
        email: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error("❌ Error submitting form:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
        <br />

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
        />
        <br />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
        />
        <br />

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <br />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password"
        />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
