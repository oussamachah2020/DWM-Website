import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const AnnonceCard = ({ profUsername, createdAt, content, year, profEmail }) => {
  const dateFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return (
    <article className="annonce-card">
      <div className="card-header">
        <div>
          <h2>{profUsername}</h2>
          <a className="btn-link" href={`mailto:${profEmail}`}>
            {profEmail}
          </a>
        </div>
        <span>{dateFormatted}</span>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
      <div className="card-footer">
        <span className={year === "1ere année" ? "first-year" : "second-year"}>
          {year}
        </span>
      </div>
    </article>
  );
};

export default AnnonceCard;
