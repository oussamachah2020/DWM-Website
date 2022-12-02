import React from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../../assets/SM-placeholder.png";
import "./home.scss";
const Home = () => {
  return (
    <div className="home-page">
      <div className="hero flex-col-center">
        <div className="container">
          <h1>Development web multimedia</h1>
          <p>
            Lorem lorem lorem lreoLorem lorem lorem lreoLorem lorem lorem
            lreoLorem lorem lorem lreoLorem lorem lorem lreo
          </p>
        </div>
      </div>

      <div className="container flex-2-wrap">
        <div className="col">
          <p>
            Lorem lorem lorem lreoLorem lorem lorem lreoLorem lorem lorem
            lreoLorem lorem lorem lreoLorem lorem lorem lreo
          </p>
        </div>
        <div className="col">
          <img src={placeholderImg} alt="" />
        </div>
      </div>
      <div className="container flex-2-wrap">
        <div className="col">
          <img src={placeholderImg} alt="" />
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
