import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchRecipeByName } from "../../redux/actions";

import "./SearchBar.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getSearchRecipeByName(searchText));
    history.push(`/recipes/${searchText}`);
    setSearchText("");
  };

  const handleSearchTermChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch}>
        <input
          className="input"
          type="text"
          name="text"
          value={searchText}
          onChange={handleSearchTermChange}
          placeholder="Buscar Receta"
        />

        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
