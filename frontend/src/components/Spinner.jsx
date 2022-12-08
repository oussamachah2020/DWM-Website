import React from "react";
import "../styles/spinner.scss";
const Spinner = () => {
  return (
    <div className="spinner">
      <div className="dot1 bg-dark rounded-circle m-2"></div>
      <div className="dot2 bg-dark rounded-circle m-2"></div>
      <div className="dot3 bg-dark rounded-circle m-2"></div>
    </div>
  );
};

export default Spinner;
