import React from "react";

const AnnonceCard = ({ profUsername, createdAt, content, year }) => {
  return (
    <article className="annonce-card">
      <div className="card-header">
        <h2>{profUsername}</h2>
        {/* <span>{createdAt}</span> */}
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <span>{year}</span>
      </div>
    </article>
  );
};

export default AnnonceCard;
