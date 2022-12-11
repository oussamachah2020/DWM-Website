import React, { useState } from "react";
import "../styles/uploadFileModal.scss";
import Spinner from "./Spinner";
import "../styles/uploadFileModal.scss";
import useAuthContext from "../hooks/useAuthContext";
const UploadFileModal = ({
  fileCategory,
  setIsModalOpen,
  selectedSubject,
  setSubjectFiles,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isPostingFile, setIsPostingFile] = useState(false);
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!selectedFile)
      return setError("Vous n'avez pas selectionné un fichier");

    setIsPostingFile(true);
    console.log("selectedFile", selectedFile);
    console.log("fileCategory", fileCategory);
    console.log("selectedSubject", selectedSubject);

    let formData = new FormData();

    formData.append("name", selectedFile.name);
    formData.append("subjectName", selectedSubject);
    formData.append("myFile", selectedFile);

    const response = await fetch(`/api/files/${fileCategory}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    const json = await response.json();
    console.log(json);
    if (response.ok) {
      window.location.reload();
      setSuccess("Fichier envoyé avec success");
    } else {
      setError("N'a pas pu de envoyé le fichier");
    }

    setIsPostingFile(false);
  };
  if (isPostingFile) {
    return (
      <div className="upload-modal-container">
        <div className="upload-modal">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div className="upload-modal-container">
      <div className="upload-modal">
        <div className="card-header">
          <h3>Ajouter un {fileCategory}</h3>
        </div>
        <form onSubmit={handleSubmit} action="">
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <label>Fichier: </label>
          <input
            type="file"
            name="myFile"
            // value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <div className="card-footer">
            <button
              onClick={() => setIsModalOpen(false)}
              className="info btn-secondary"
            >
              Annuler
            </button>
            <button className="success btn-primary">Confirmer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFileModal;
