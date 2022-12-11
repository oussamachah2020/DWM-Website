import React from "react";
import "./help.scss";
const Help = () => {
  return (
    <div className="help-page container-fluid">
      <h2>Help</h2>
      <p>
        Problème, suggestion ou nouvelles idées de fonctionnalités ?
        <br />
        contactez-nous à l'un des e-mails suivants :
        <span>
          <a href="mailto:itistarek@gmail.com">itistarek@gmail.com</a>{" "}
        </span>
        <span>
          <a href="mailto:oussamachahidi20@gmail.com">
            oussamachahidi20@gmail.com
          </a>
        </span>
      </p>
    </div>
  );
};

export default Help;
