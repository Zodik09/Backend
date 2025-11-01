import React from "react";

const Label = ({
  // label,
  name,
  type,
  value,
  autoComplete,
  placeholder,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      {/* {label} */}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default Label;
