import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, cleanDetail } from "../../redux/actions";
import "./RecipeDetail.css";

const RecipeDetail = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeById);

  useEffect(() => {
    dispatch(getRecipeById(id));
    return function () {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);
  if (recipe.title) {
    return (
      <div className="recipe-detail">
        <h1 className="title-detail">{recipe.title}</h1>
        <h5>
          <strong>ID:</strong>
          {recipe.id}
        </h5>
        <img className="img-detail" src={recipe.image} alt={recipe.title} />
        <div>
          <h2 className="detail-healthscore">
            <strong>Nivel saludable: </strong>
            {recipe.healthScore}
          </h2>
          <h2 className="detail-diet">
            <strong>Dieta:</strong>
            {recipe.diets.join("-")}
          </h2>
        </div>
        <p className="recipe-summary">{recipe.summary}</p>

        <div className="detail-steps">
          <p>Paso a paso:</p>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  } else {
    return <div className="loader"></div>;
  }
};

export default RecipeDetail;

// ID.
// title.
// Resumen del plato.
// Nivel de comida saludable (health score).
// Paso a paso.
// Imagen.
// Tipos de dieta.
