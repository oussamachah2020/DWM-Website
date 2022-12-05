import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "./loginStudent.scss";
const LoginStudent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, error, isLoading } = useLogin("/api/students/login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    navigate("/home");
  };
  return (
    <div className="login-student container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <span className="error">{error}</span>}
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
        <Link className="ghost-btn" to="">
          Mot de passe oublié?
        </Link>
      </form>
    </div>
  );
};

export default LoginStudent;
