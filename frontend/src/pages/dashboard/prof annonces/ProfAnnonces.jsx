import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProfContext from "../../../hooks/useProfContext";
import { HomeIcon } from "../../../assets/icons";
import "./profAnnonces.scss";
import ProfAnnonceCard from "../../../components/ProfAnnonceCard";
import useAuthContext from "../../../hooks/useAuthContext";
import { Pen } from "react-bootstrap-icons";
import Spinner from "../../../components/Spinner";
const ProfAnnonces = () => {
  const { user } = useAuthContext();
  const { getProfAnnonces, isLoading, profAnnonces } = useProfContext();

  useEffect(() => {
    getProfAnnonces();
  }, [user]);

  if (isLoading)
    return (
      <div className="prof-annonces container-fluid">
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );
  return (
    <div className="prof-annonces container-fluid">
      <aside>
        <Link to="/dashboard/annoncer">
          <Pen color="royalblue" size={20} />
          <span>Annoncer Quelque Chose</span>
        </Link>
        {/* <Link to="/dashboard/mesannonces">
          <img src={HomeIcon} alt="Icon" />
          <span>Mes Annonces</span>
        </Link> */}
      </aside>
      <main>
        {profAnnonces.length > 0
          ? profAnnonces.map((annonce) => (
              <ProfAnnonceCard key={annonce._id} {...annonce} />
            ))
          : "Vous n'avez posté aucune annonce"}
      </main>
    </div>
  );
};

export default ProfAnnonces;
