import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "./loginTeacher.scss";
const LoginTeacher = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, error, isLoading } = useLogin("/api/profs/login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await login(formData.email, formData.password, true);
    if (isValid) navigate("/dashboard/");
  };
  return (
    <div className="login-teacher container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
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
        <button disabled={isLoading} className="btn-primary" type="submit">
          Se Connecter
        </button>
      </form>
    </div>
  );
};

export default LoginTeacher;
