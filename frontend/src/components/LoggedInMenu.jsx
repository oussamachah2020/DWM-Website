import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  HelpIcon,
  HomeIcon,
  SettingsIcon,
  ScheduleIcon,
} from "../assets/icons";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
import {
  BoxArrowDownLeft,
  BoxArrowLeft,
  CardChecklist,
  FileEarmarkText,
  House,
  Person,
  Speedometer2,
} from "react-bootstrap-icons";
const LoggedOutMenu = ({ setOpen }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };
  return (
    <div className="hamburger-menu">
      <img className="logo" src={logo} alt="Logo" />

      <h3 className="username" style={{ textAlign: "center" }}>
        {user.username}
      </h3>
      <p className="silent">Menu</p>

      <ul className="nav-links">
        {user.admin ? (
          <>
            <li onClick={() => setOpen(false)}>
              <Link to="/home">
                <House size={20} color="royalblue" />
                Accueil
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/dashboard">
                <Speedometer2 size={20} color="royalblue" />
                Dashboard
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/dashboard/profile">
                <Person
                  size={25}
                  color="royalblue"
                  style={{ marginRight: "5px" }}
                />
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => setOpen(false)}>
              <Link to="/home">
                <House
                  size={25}
                  color="royalblue"
                  style={{ marginRight: "5px" }}
                />
                Accueil
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/etudiant/mesnotes">
                <CardChecklist
                  size={25}
                  color="royalblue"
                  style={{ marginRight: "5px" }}
                />
                Resultats
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/etudiant/mescours">
                <FileEarmarkText
                  color="royalblue"
                  size={25}
                  style={{ marginRight: "5px" }}
                />
                Modules
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/etudiant/profile">
                <Person
                  size={25}
                  color="royalblue"
                  style={{ marginRight: "5px" }}
                />
                Profile
              </Link>
            </li>
          </>
        )}

        <li style={{ cursor: "pointer" }} onClick={handleLogout}>
          <BoxArrowLeft
            size={25}
            color="royalblue"
            style={{ marginRight: "5px" }}
          />
          Se Deconnecter
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
