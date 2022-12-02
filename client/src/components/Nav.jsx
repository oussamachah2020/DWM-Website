import React from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import LoggedOutMenu from "./LoggedOutMenu";

import "../styles/nav.scss";
const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="flex-2">
      <img src={logo} alt="Logo" />

      <Hamburger size={35} toggled={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && <div className="blur-overlay" />}
      {isOpen && <LoggedOutMenu />}
    </nav>
  );
};

export default Nav;
