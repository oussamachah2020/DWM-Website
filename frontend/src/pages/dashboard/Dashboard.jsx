import React from "react";
import { Files } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { AddIcon, NoteIcon } from "../../assets/icons";
import Spinner from "../../components/Spinner";
import useAuthContext from "../../hooks/useAuthContext";
import "./dashboard.scss";
const Dashboard = () => {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="dashboard-page container-fluid">
      <h2>
        Bienvenue <span>{user?.username}</span>
      </h2>
      <div className="actions-container">
        <Link to="annoncer" className="action">
          <div className="icon-container">
            <img src={AddIcon} alt="Icon" />
          </div>
          <h4>Announcer quelque chose</h4>
        </Link>
        <Link to="ajouter-notes" className="action">
          <div className="icon-container">
            <img src={NoteIcon} alt="Icon" />
          </div>
          <h4>Ajouter des notes</h4>
        </Link>
        <Link to="mescours" className="action">
          <div className="icon-container">
            <Files color="white" size={67} />
          </div>
          <h4>Ajouter des notes</h4>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
