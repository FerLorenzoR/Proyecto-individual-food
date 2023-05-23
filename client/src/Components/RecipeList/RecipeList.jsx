import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
