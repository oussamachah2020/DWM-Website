import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProfContext from "../../hooks/useProfContext";
import { HomeIcon } from "../../assets/icons";
import AnnonceCard from "../../components/AnnonceCard";
import "./home.scss";
import Spinner from "../../components/Spinner";
const HomeProf = () => {
  const { getAnnoncesWithAnnocersData, isLoading, allAnnonces } =
    useProfContext();

  useEffect(() => {
    getAnnoncesWithAnnocersData();
  }, []);

  if (isLoading)
    return (
      <div className="home container-fluid">
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );
  return (
    <div className="home container-fluid">
      <aside>
        <Link to="/dashboard/annoncer">
          <img src={HomeIcon} alt="Icon" />
          <span>Annoncer Quelque Chose</span>
        </Link>
        <Link to="/dashboard/mesannonces">
          <img src={HomeIcon} alt="Icon" />
          <span>Mes Annonces</span>
        </Link>
      </aside>
      <main>
        {allAnnonces.length > 0
          ? allAnnonces.map((annonce) => (
              <AnnonceCard key={annonce.id} {...annonce} />
            ))
          : "Aucune post existent actuellement"}
      </main>
    </div>
  );
};

export default HomeProf;
