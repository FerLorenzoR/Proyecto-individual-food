import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="content">
        <h1>¡Sorry this page not found!</h1>
        <NavLink to="/recipes" className="nav-link">
          Volver al Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
