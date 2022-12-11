import React, { useState } from "react";
import { useEffect } from "react";
import { Trash } from "react-bootstrap-icons";
import Spinner from "../../components/Spinner";
import UploadFileModal from "../../components/UploadFileModal";
import useAuthContext from "../../hooks/useAuthContext";
import useProfContext from "../../hooks/useProfContext";
import "./profCours.scss";
const ProfCours = () => {
  const { user } = useAuthContext();
  const { getProfSubjects, isLoading, profSubjects } = useProfContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [fileCategory, setFileCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getProfSubjects();
  }, [user]);

  useEffect(() => {
    if (profSubjects.length == 0) return setSelectedSubject(null);
    setSelectedSubject(profSubjects[0].name);
  }, [profSubjects]);

  useEffect(() => {
    console.log("selected subject", selectedSubject);
  }, [selectedSubject]);
  if (isLoading) {
    return (
      <div className="prof-cours-page container-fluid">
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <>
      {isModalOpen && (
        <UploadFileModal
          setIsModalOpen={setIsModalOpen}
          fileCategory={fileCategory}
          selectedSubject={selectedSubject}
        />
      )}
      <div className="prof-cours-page container-fluid">
        <h3>Votre Modules</h3>
        <div className="subjects-container">
          {profSubjects.map((subject) => (
            <div
              onClick={() => setSelectedSubject(subject.name)}
              key={subject._id}
              className={
                subject.name === selectedSubject
                  ? "subject selected"
                  : "subject"
              }
            >
              {subject.name}
            </div>
          ))}
        </div>
        <main>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">I- Cours</h2>
              <button
                onClick={() => {
                  setFileCategory("cours");
                  setIsModalOpen(true);
                }}
                className="add-btn"
              >
                Ajouter
              </button>
            </div>
            <div className="file">
              <h4 className="file-name">Chapitre_1.pdf</h4>
              <Trash className="icon" color="red" size={25} />
            </div>
            <div className="file">
              <h4 className="file-name">Chapitre_1.pdf</h4>
            </div>
          </div>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">I- TD</h2>
              <button
                onClick={() => {
                  setFileCategory("tds");
                  setIsModalOpen(true);
                }}
                className="add-btn"
              >
                Ajouter
              </button>
            </div>
            <div className="file">
              <h4 className="file-name">TD.pdf</h4>
            </div>
            <div className="file">
              <h4 className="file-name">TD.pdf</h4>
            </div>
          </div>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">I- TP</h2>
              <button
                onClick={() => {
                  setFileCategory("tps");
                  setIsModalOpen(true);
                }}
                className="add-btn"
              >
                Ajouter
              </button>
            </div>
            <div className="file">
              <h4 className="file-name">TP.pdf</h4>
            </div>
            <div className="file">
              <h4 className="file-name">TP.pdf</h4>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfCours;
