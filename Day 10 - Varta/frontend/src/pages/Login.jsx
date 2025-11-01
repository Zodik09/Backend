import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/Router";
import Label from "../components/Label";
import "../styles/login.css";
import Tree from "../assets/tree.jpg";

const Login = () => {
  const inputFieldData = [
    {
      // label: "Email",
      name: "email",
      value: "email",
      type: "email",
      autoComplete: "email",
      placeholder: "Enter your email",
    },
    {
      // label: "Password",
      name: "password",
      type: "password",
      value: "password",
      autoComplete: "new-password",
      placeholder: "Enter your password",
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
      const result = await instance.post("/auth/login", formData);
      console.log(result?.data?.message);
      navigate("/chat");
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Login failed";
      console.error("Login error:", msg);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <div className="left">
          <img src={Tree} alt="tree" />
        </div>
        <div className="right">
          <h2>Login</h2>
          <form onSubmit={submit}>
            {inputFieldData.map((field, index) => (
              <Label
                key={index}
                // label={field.label}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
