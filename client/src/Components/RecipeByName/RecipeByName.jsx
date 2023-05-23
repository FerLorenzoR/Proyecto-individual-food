import React from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeByName.css";

const RecipeByName = ({ match }) => {
  const { name } = match.params;
  const searchRecipeByName = useSelector((state) => state.searchRecipeByName);
  if (name) {
    return (
      <div className="recipe-byname ">
        {searchRecipeByName.length ? (
          <div className="recipe-card">
            {searchRecipeByName.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <h2>No hay resultados para "{name}"</h2>
        )}
      </div>
    );
  } else
    return (
      <div className="recipe-byname ">
        <div className="loader"></div>
      </div>
    );
};

export default RecipeByName;
