import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import "./profile.scss";
const Profile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="profile-student-page container-fluid">
      <h2>Profile</h2>
      <div className="card">
        {user ? (
          <>
            <div className="card-header">
              <h3>{user.username}</h3>
              <small>{user.email}</small>

              <small className="student-year">{user.year}</small>
            </div>
            <div className="card-footer">
              <button onClick={handleLogout} className="warning btn-secondary">
                Se deconnecter
              </button>
              <button className="info btn-primary">
                <Link to="/etudiant/modifier-motdepasse">
                  Changer Mot de passe
                </Link>
              </button>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Profile;
