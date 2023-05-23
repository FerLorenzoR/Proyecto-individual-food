const { Router } = require("express");
const recipe = Router();
const {
  getRecipes,
  getRecipeByiD,
  postRecipe,
} = require("./middleware/recipeFunc");

recipe.get("/", async (req, res) => {
  let { title } = req.query;
  try {
    const recipes = await getRecipes(title);
    res.status(200).send(recipes);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error al mostrar recetas");
  }
});
recipe.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipeById = await getRecipeByiD(id);
    res.status(200).send(recipeById);
  } catch (error) {
    res.status(400).send(`Error al mostrar usuario con id:${id}`);
  }
});
recipe.post("/create", async (req, res) => {
  const { title, image, summary, healthScore, steps, dietId } = req.body;
  const newRecipe = {
    title,
    image,
    summary,
    healthScore,
    steps,
    dietId,
  };
  try {
    const recipe = await postRecipe(newRecipe);
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send("Error al crear receta");
  }
});

module.exports = recipe;
