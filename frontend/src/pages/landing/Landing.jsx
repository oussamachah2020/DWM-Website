import React from "react";
import { Link } from "react-router-dom";
import estm from "../../assets/estm.jpg";
import computer from "../../assets/computer.jpg";
import "./landing.scss";
const Home = () => {
  return (
    <div className="home-page">
      <div className="hero flex-col-center">
        <div className="container">
          <h1>Development web multimedia</h1>
          <p>
            La nouvelle filliere qui appartient au departement de genie
            informatique
          </p>
        </div>
      </div>

      <div className="container flex-2-wrap">
        <div className="col">
          <p>
            Crée en 1993, l'École Supérieure de Technologie de Meknès est un
            établissement d'enseignement supérieur universitaire technique{" "}
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
            neque.
          </p>
        </div>
        <div className="col-image col">
          <img src={estm} alt="" />
        </div>
      </div>
      <div className="container flex-2-wrap">
        <div className="col-image col">
          <img src={computer} alt="" />
        </div>
        <div className="col">
          <p>
            Lorem lorem lorem lreoLorem lorem lorem lreoLorem lorem lorem
            lreoLorem lorem lorem lreoLorem lorem lorem lreo
          </p>
        </div>
      </div>

      <div className="container">
        <div className="btn-container">
          <Link to="/login">
            <button className="btn-primary">Decouvrir</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
