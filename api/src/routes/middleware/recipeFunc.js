const {
    getApiRecipes,
    getApiRecipesByName,
    getApiRecipeById,
  } = require("./modules/getApiRecipe.js"),
  {
    getAllRecipesFromDataBase,
    getRecipesFromDataBaseByName,
    getRecipeFromDataBaseById,
  } = require("./modules/getRecipesFromDB.js"),
  { modulePostRecipe } = require("./modules/postRecipe.js");

const getRecipes = async (name) => {
  const dataBaseRecipes = await (name
    ? getRecipesFromDataBaseByName(name)
    : getAllRecipesFromDataBase());
  const apiRecipes = await (name ? getApiRecipesByName(name) : getApiRecipes());
  const recipes = [...dataBaseRecipes, ...apiRecipes];
  return recipes;
};

const getRecipeByiD = async (id) => {
  const recipeById =
    (await id.length) > 10
      ? getRecipeFromDataBaseById(id)
      : getApiRecipeById(id);

  return recipeById;
};

const postRecipe = async (newRecipe) => {
  return await modulePostRecipe(newRecipe);
};

module.exports = {
  getRecipes,
  getRecipeByiD,
  postRecipe,
};

// if (id.length > 10) {
//   return await getRecipeFromDataBaseById(id);
// } else {
//   return await getApiRecipeById(id);
// }
