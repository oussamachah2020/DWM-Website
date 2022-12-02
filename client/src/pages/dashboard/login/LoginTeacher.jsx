import React from "react";
import { Link } from "react-router-dom";
import "./loginTeacher.scss";
const LoginTeacher = () => {
  return (
    <div className="login-teacher container">
      <form className="" action="">
        <h1>Login Prof</h1>
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

export default LoginTeacher;
