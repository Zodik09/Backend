import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import instance from "../utils/Router";

const Login = () => {
  const inputFieldData = [
    {
      label: "Email",
      name: "email",
      value: "email",
      type: "email",
      autoComplete: "email",
      placeholder: "example@example.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: "password",
      autoComplete: "new-password",
      placeholder: "********",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await instance.post("/api/auth/login", formData);
      console.log(result.data.message);
      navigate("/chat");
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || "Login failed";
      console.error("Login error:", msg);
    }
  };

  return (
    <Card>
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        {inputFieldData.map((field, index) => (
          <Label
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            value={formData[field.value]}
            setFormData={setFormData}
          />
        ))}

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </Card>
  );
};

export default Login;
