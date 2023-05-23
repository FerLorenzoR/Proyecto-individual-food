const { default: axios } = require("axios");
require("dotenv").config();
const { API_KEY } = process.env,
  API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
const recipeModel = require("./recipeModel.js");

const getApiRecipes = async () => {
  try {
    const recipesApiData = await axios.get(API);
    const allRecipes = recipesApiData.data.results.map((r) => {
      return recipeModel(r);
    });
    return allRecipes;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener recetas de la API");
  }
};

const getApiRecipesByName = async (name) => {
  try {
    const recipesApiData = await axios.get(API);
    const apiNameRecipes = await recipesApiData.data.results
      .filter((r) => r.title.toLowerCase().includes(name.toLowerCase()))
      .map((r) => {
        return recipeModel(r);
      });
    return apiNameRecipes;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener recetas de la API");
  }
};

const getApiRecipeById = async (id) => {
  const APIById = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
  try {
    const response = await axios.get(APIById);
    const recipesApiData = recipeModel(response.data);
    return recipesApiData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiRecipes,
  getApiRecipesByName,
  getApiRecipeById,
};
