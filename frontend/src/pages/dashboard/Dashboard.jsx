import React from "react";
import { Link } from "react-router-dom";
import { AddIcon, NoteIcon } from "../../assets/icons";
import useAuthContext from "../../hooks/useAuthContext";
import "./dashboard.scss";
const Dashboard = () => {
  const { user } = useAuthContext();
  return (
    <div className="dashboard-page container-fluid">
      <h2>
        Bienvenue <span>{user.username}</span>
      </h2>
      <div className="actions-container">
        <Link to="announcer" className="action">
          <div className="icon-container">
            <img src={AddIcon} alt="Icon" />
          </div>
          <h4>Announcer quelque chose</h4>
        </Link>
        <div className="action">
          <div className="icon-container">
            <img src={NoteIcon} alt="Icon" />
          </div>
          <h4>Ajouter des notes</h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
