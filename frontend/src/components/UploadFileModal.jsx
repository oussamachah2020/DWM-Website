import React, { useState } from "react";
import "../styles/uploadFileModal.scss";
import Spinner from "./Spinner";
import "../styles/uploadFileModal.scss";
const UploadFileModal = ({ fileCategory, setIsModalOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isPostingFile, setIsPostingFile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!selectedFile)
      return setError("Vous n'avez pas selectionné un fichier");
    if (selectedFile.size > 16384)
      return setError(
        "La taille du fichier ne peut pas dépasser plus de 16 Mo"
      );

    console.log("selectedFile", selectedFile);
    console.log("fileCategory", fileCategory);
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
          <label>Fichier: </label>
          <input
            type="file"
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
