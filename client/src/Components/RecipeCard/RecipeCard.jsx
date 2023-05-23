import React from "react";
import { Link } from "react-router-dom";

import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  try {
    const { image, title, diets } = recipe;
    return (
      <div className="card">
        <img src={image} alt={title} className="recipe-image" />
        <div className="card-info">
          <p className="text-title">Título:</p>
          <p className="text-body">{title}</p>
          <p className="text-title">Dietas:</p>
          <p className="text-body">{diets.join(" - ")}</p>
          <Link to={`/recipes/detail/${recipe.id}`}>
            <button className="button">Mas informacíon</button>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error en RecipeCard:", error);
    return null;
  }
};

export default RecipeCard;

//  <div className="card">
//         <div className="recipe-card__image">
//           <Link to={`/recipes/detail/${recipe.id}`}>
//             <img src={image} alt={title} className="recipe-image" />
//           </Link>
//         </div>
//         <div className="recipe-card__info">
//           <h2 className="recipe-card__info-title">Título:</h2>
//           <p className="recipe-card__info-text">{title}</p>
//           <h2 className="recipe-card__info-title">Dietas:</h2>
//           <p className="recipe-card__info-text">{diets.join(", ")}</p>
//         </div>
//       </div>
