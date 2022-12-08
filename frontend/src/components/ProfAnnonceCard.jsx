import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useAuthContext from "../hooks/useAuthContext";
import useProfContext from "../hooks/useProfContext";
import { ArrowRepeat, Trash2, Trash3 } from "react-bootstrap-icons";

import { useState } from "react";
const ProfAnnonceCard = ({ createdAt, content, year, _id }) => {
  const { user } = useAuthContext();
  const dateFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  const { deleteAnnonce } = useProfContext();
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    const isDeleted = await deleteAnnonce(_id);
    if (!isDeleted) setError("N'a pas pu de supprimer l'annonce");
    setIsDeleting(false);
  };
  return (
    <article className="annonce-card">
      {error && <p className="error">{error}</p>}
      <div className="card-header">
        <div>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
        <span>{dateFormatted}</span>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <ArrowRepeat size={25} className="icon loading-icon" />
          ) : (
            <Trash2 color="red" size={25} className="icon delete-icon" />
          )}
        </button>
        <span className={year === "1ere année" ? "first-year" : "second-year"}>
          {year}
        </span>
      </div>
    </article>
  );
};

export default ProfAnnonceCard;
