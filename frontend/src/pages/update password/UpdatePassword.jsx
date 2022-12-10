import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import updatePassword from "../../utilities/updatePassword";
import "./updatePassword.scss";
const UpdatePassword = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const handleClick = async () => {
    if (!user) return setError("Devez etre connecté pour changer le mdp");
    if (!newPassword) return setError("Remplir le mot de passe");
    const url = user.admin ? "/api/profs/reset" : "/api/students/reset";
    const { isSuccess, json } = await updatePassword(
      newPassword,
      url,
      user.token
    );
    if (isSuccess) {
      setSuccess(json.msg);
      setNewPassword("");
    } else {
      setError(json.error);
    }
  };
  return (
    <div className="update-pw-page container-fluid">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-header">
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <h3>Nouveau mot de passe: </h3>
          <input
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="card-footer">
          <button onClick={() => navigate(-1)} className="info btn-secondary">
            Annuler
          </button>
          <button onClick={handleClick} className="success btn-primary">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
