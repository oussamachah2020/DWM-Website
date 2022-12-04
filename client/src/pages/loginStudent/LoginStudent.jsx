import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginStudent.scss";
const LoginStudent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };
  return (
    <div className="login-student container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          placeholder="Email Academique"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              password: e.target.value,
            }))
          }
          placeholder="Mot de passe"
        />
        <button className="btn-primary" type="submit">
          Se Connecter
        </button>
        <Link className="ghost-btn" to="">
          Mot de passe oublié?
        </Link>
      </form>
    </div>
  );
};

export default LoginStudent;
