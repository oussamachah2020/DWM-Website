import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";
import "./annoncer.scss";
const Announcer = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    content: "",
    year: "1ere année",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { content, year } = formData;
    setSuccess("");
    setError("");
    if (!content) return setError("Le contenu est requis");
    if (!year) return setError("l'année d'étude est requise");
    const response = await fetch("/api/annonces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${user.token}`,
      },
      body: JSON.stringify({ content, year }),
    });
    const json = await response.json();
    if (response.ok) {
      setSuccess("Annonce publié avec success");
      setFormData({ ...formData, content: "" });
    } else {
      setError(json.error);
    }
  };
  return (
    <div className="announce-page container-fluid">
      <h2>Créer une annonce</h2>
      {success && (
        <p className="success">
          {success}{" "}
          <button className="btn-link" onClick={() => navigate(-1)}>
            retourner
          </button>
        </p>
      )}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Contenu de l'annonce"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        ></textarea>
        <div className="radios-container">
          <div className="radio-container">
            <input
              className="form__radio-input"
              type="radio"
              name="year"
              id="1ere année"
              defaultChecked
              onClick={(e) => setFormData({ ...formData, year: "1ere année" })}
            />
            <label htmlFor="1ere année" className="form__label-radio">
              <span className="form__radio-button"></span>
              1ere année
            </label>
          </div>
          <div className="radio-container">
            <input
              className="form__radio-input"
              type="radio"
              name="year"
              id="2eme année"
              onClick={(e) => setFormData({ ...formData, year: "2eme année" })}
            />
            <label htmlFor="2eme année" className="form__label-radio">
              <span className="form__radio-button"></span>
              2eme année
            </label>
          </div>
        </div>
        <div className="btns-container">
          <button className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">
            Announcer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcer;
