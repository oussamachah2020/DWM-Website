import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const AnnonceCard = ({ profUsername, createdAt, content, year }) => {
  const dateFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return (
    <article className="annonce-card">
      <div className="card-header">
        <h2>{profUsername}</h2>
        <span>{dateFormatted}</span>
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
