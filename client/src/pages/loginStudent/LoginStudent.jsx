import React from "react";
import { Link } from "react-router-dom";
import "./loginStudent.scss";
const LoginStudent = () => {
  return (
    <div className="login-student container">
      <form className="" action="">
        <h1>Login</h1>
        <input type="email" name="" id="" placeholder="Email Academique" />
        <input type="password" name="" id="" placeholder="Mot de passe" />
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
