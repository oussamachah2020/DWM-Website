import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfContext from "../../../hooks/useProfContext";
import "./annoncer.scss";
const Announcer = () => {
  const [formData, setFormData] = useState({
    content: "",
    year: "1ere année",
  });

  const navigate = useNavigate();
  const { success, error, isLoading, postAnnonce } = useProfContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { content, year } = formData;
    await postAnnonce(content, year);
    setFormData({ ...formData, content: "" });
  };
  return (
    <div className="container-fluid announce-page">
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
          <button disabled={isLoading} type="submit" className="btn-primary">
            Announcer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcer;
