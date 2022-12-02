import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/nav.scss";
const Nav = () => {
  return (
    <nav className="flex-2">
      <img src={logo} alt="Logo" />
      <ul>
        <li>
          <Link to="/signup">Register</Link>
        </li>
        <li>
          <Link to="/login">
            <button className="btn-rounded">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
