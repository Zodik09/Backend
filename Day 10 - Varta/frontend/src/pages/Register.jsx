import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import instance from "../utils/Router";
import "../styles/register.css";
import Label from "../components/Label";

const Register = () => {
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
      label: "First Name",
      name: "firstName",
      type: "text",
      value: "firstName",
      autoComplete: "given-name",
      placeholder: "Ram",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      value: "lastName",
      autoComplete: "family-name",
      placeholder: "Kumar",
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
    firstName: "",
    lastName: "",
    password: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await instance.post("/api/auth/register", formData);
      console.log(result.data.message);
      navigate("/chat");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      console.error("Registration error:", msg);
    }
  };

  return (
    <Card>
      <h2>Create account</h2>
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
          Register
        </button>
      </form>
    </Card>
  );
};

export default Register;
