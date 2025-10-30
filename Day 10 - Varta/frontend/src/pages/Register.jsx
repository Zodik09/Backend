import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // defer auth implementation to backend — just navigate to /chat for now
    setMessage({
      type: "success",
      text: "Form submitted (backend integration pending)",
    });
    navigate("/chat");
  };

  return (
    <Card>
      <h2>Create account</h2>
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
        <div className="row">
          <label>
            First name
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last name
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
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
          Register
        </button>

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </form>
    </Card>
  );
};

export default Register;
