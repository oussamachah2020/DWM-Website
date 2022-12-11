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
  const [deleteError, setDeleteError] = useState(null);
  const [subjectFiles, setSubjectFiles] = useState({
    cours: [],
    tps: [],
    tds: [],
  });
  useEffect(() => {
    getProfSubjects();
  }, [user]);

  useEffect(() => {
    if (profSubjects.length == 0) return setSelectedSubject(null);
    setSelectedSubject(profSubjects[0].name);
  }, [profSubjects]);

  const getSubjectFiles = async (subjectName, category) => {
    console.log("trying");
    const response = await fetch(`/api/files/${subjectName}/${category}`);

    const json = await response.json();

    console.log("json", json);
    if (response.ok) {
      setSubjectFiles((prevFiles) => ({ ...prevFiles, [category]: json }));
    } else {
      setSubjectFiles({});
    }
  };
  useEffect(() => {
    console.log("subjectFiles", subjectFiles);
  }, [subjectFiles]);
  useEffect(() => {
    if (!selectedSubject) return;

    getSubjectFiles(selectedSubject, "cours");
    getSubjectFiles(selectedSubject, "tds");
    getSubjectFiles(selectedSubject, "tps");
    console.log("selected subject", selectedSubject);
  }, [selectedSubject]);

  const deleteFile = async (fileName, category) => {
    const response = await fetch(
      `/api/files/${selectedSubject}/${category}/${fileName}`,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();
    if (response.ok) {
      setSubjectFiles((subjectFiles) => {
        const newArray = subjectFiles[category].filter(
          (file) => file.fileName !== fileName
        );
        return { ...subjectFiles, [category]: newArray };
      });
    } else {
      setDeleteError(json.err);
    }
    console.log("json", json);
  };
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
          setSubjectFiles={setSubjectFiles}
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
            {deleteError && <p className="error">{deleteError}</p>}
            {subjectFiles.cours.map((file, idx) => (
              <div key={idx} className="file">
                <h4 className="file-name">{file.fileName}</h4>
                <a
                  href={`/uploads/subjects/${selectedSubject}/cours/${file.fileName}`}
                  download
                >
                  download
                </a>
                <Trash
                  onClick={() => deleteFile(file.fileName, "cours")}
                  className="icon"
                  color="red"
                  size={25}
                />
              </div>
            ))}
          </div>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">II- TD</h2>
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
            {subjectFiles.tds.map((file, idx) => (
              <div key={idx} className="file">
                <h4 className="file-name">{file.fileName}</h4>
                <a
                  href={`/uploads/subjects/${selectedSubject}/tds/${file.fileName}`}
                  download
                >
                  download
                </a>
                <Trash
                  onClick={() => deleteFile(file.fileName, "cours")}
                  className="icon"
                  color="red"
                  size={25}
                />
              </div>
            ))}
          </div>
          <div className="file-container">
            <div className="header">
              <h2 className="file-category">III- TP</h2>
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
            {subjectFiles.tps.map((file, idx) => (
              <div key={idx} className="file">
                <h4 className="file-name">{file.fileName}</h4>
                <a
                  href={`/uploads/subjects/${selectedSubject}/tps/${file.fileName}`}
                  download
                >
                  download
                </a>
                <Trash
                  onClick={() => deleteFile(file.fileName, "cours")}
                  className="icon"
                  color="red"
                  size={25}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfCours;
