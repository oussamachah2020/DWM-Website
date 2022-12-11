import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  HelpIcon,
  HomeIcon,
  SettingsIcon,
  ScheduleIcon,
  SignInIcon,
  StudentIcon,
  TeacherIcon,
} from "../assets/icons";
const LoggedOutMenu = ({ setOpen }) => {
  return (
    <div className="hamburger-menu">
      <img className="logo" src={logo} alt="Logo" />
      <p className="silent">Menu</p>

      <ul className="nav-links">
        <li onClick={() => setOpen(false)}>
          <Link to="/home">
            <img className="icon" src={HomeIcon} alt="Icon" />
            Accueil
          </Link>
        </li>
        <li onClick={() => setOpen(false)}>
          <Link to="/home">
            <img className="icon" src={ScheduleIcon} alt="Icon" />
            Horaires
          </Link>
        </li>
        <li>
          <p>
            <img className="icon" src={SignInIcon} alt="Icon" />
            Se Connecter
          </p>
          <ul className="authentication-links">
            <Link onClick={() => setOpen(false)} to="/login">
              <img className="icon" src={StudentIcon} alt="Icon" />
              Etudiant
            </Link>
            <Link onClick={() => setOpen(false)} to="/dashboard/login">
              <img className="icon" src={TeacherIcon} alt="Icon" />
              Professeur
            </Link>
          </ul>
        </li>

        <li onClick={() => setOpen(false)}>
          <Link to="/help">
            <img className="icon" src={HelpIcon} alt="Icon" />
            Help
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoggedOutMenu;
