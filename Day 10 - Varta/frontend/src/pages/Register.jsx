import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/Router";
import "../styles/register.css";
import Label from "../components/Label";
import Tree from "../assets/tree.jpg";

const Register = () => {
  const inputFieldData = [
    {
      // label: "First Name",
      name: "firstName",
      type: "text",
      value: "firstName",
      autoComplete: "given-name",
      placeholder: "Enter your first name",
    },
    {
      // label: "Last Name",
      name: "lastName",
      type: "text",
      value: "lastName",
      autoComplete: "family-name",
      placeholder: "Enter your last name",
    },
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
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await instance.post("/auth/register", formData);
      console.log(result?.data?.message);
      navigate("/chat");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";
      console.error("Registration error:", msg);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <div className="left">
          <img src={Tree} alt="tree" />
        </div>
        <div className="right">
          <h2>Create account</h2>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
