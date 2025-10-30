import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // auth is handled on the backend; just navigate to /chat for now
    setMessage({
      type: "success",
      text: "Form submitted (backend integration pending)",
    });
    navigate("/chat");
  };

  return (
    <Card>
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="btn" type="submit">
          Login
        </button>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </form>
    </Card>
  );
};

export default Login;
