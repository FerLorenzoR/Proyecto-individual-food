import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <h1>Laboratorio de recetas</h1>
        <h2>Lo gourmet al alcance de todos</h2>
        <a href="/recipes">
          <button className="landing-button">Comenzar</button>
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
