import React from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import LoggedOutMenu from "./LoggedOutMenu";
import LoggedInMenu from "./LoggedInMenu";

import "../styles/nav.scss";
import useAuthContext from "../hooks/useAuthContext";
const Nav = () => {
  const { user } = useAuthContext();
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="flex-2">
      {isOpen && <div className="blur-overlay" />}
      <img src={logo} alt="Logo" />
      <div className="name-burger-container">
        {user && <h4>Bienvenue {user.username}</h4>}
        <Hamburger size={35} toggled={isOpen} toggle={() => setOpen(!isOpen)} />
      </div>
      {isOpen && !user && <LoggedOutMenu />}
      {isOpen && user && <LoggedInMenu />}
    </nav>
  );
};

export default Nav;
