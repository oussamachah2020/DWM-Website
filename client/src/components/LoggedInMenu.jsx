import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  HelpIcon,
  HomeIcon,
  SettingsIcon,
  ScheduleIcon,
} from "../assets/icons";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
const LoggedOutMenu = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="hamburger-menu">
      <img className="logo" src={logo} alt="Logo" />
      <h3 style={{ textAlign: "center" }}>{user.username}</h3>
      <p className="silent">Menu</p>

      <ul className="nav-links">
        <li>
          <Link to="/home">
            <img className="icon" src={HomeIcon} alt="Icon" />
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/home">
            <img className="icon" src={ScheduleIcon} alt="Icon" />
            Horaires
          </Link>
        </li>
        <li style={{ cursor: "pointer" }} onClick={logout}>
          <img className="icon" src={ScheduleIcon} alt="Icon" />
          Se Deconnecter
        </li>

        <li>
          <Link to="/home">
            <img className="icon" src={SettingsIcon} alt="Icon" />
            Settings
          </Link>
        </li>
        <li>
          <Link to="/home">
            <img className="icon" src={HelpIcon} alt="Icon" />
            Help
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoggedOutMenu;
