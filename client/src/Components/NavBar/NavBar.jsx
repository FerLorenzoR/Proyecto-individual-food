import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li></li>
        <li>
          <NavLink to="/recipes" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes/create" className="nav-link">
            Crear Receta
          </NavLink>
        </li>
      </ul>
      <NavLink to="/" className="logo-link">
        <h2>Laboratorio de Recetas</h2>
      </NavLink>
      <li className="searchBar">
        <SearchBar />
      </li>
    </nav>
  );
};

export default NavBar;
