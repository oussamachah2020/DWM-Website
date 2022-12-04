import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthStudentProvider } from "./context/AuthStudentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthStudentProvider>
        <App />
      </AuthStudentProvider>
    </Router>
  </React.StrictMode>
);
