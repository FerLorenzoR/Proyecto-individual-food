const { Recipe, Diet } = require("../../../db.js"),
  { Op } = require("sequelize");

const getAllRecipesFromDataBase = async () => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    const diets = recipes.map((recipe) => recipe.diets.map((d) => d.name));

    const formatedRecipes = recipes.map((recipe, index) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      diets: diets[index],
    }));

    return formatedRecipes;
  } catch (error) {
    console.error(error);
  }
};

const getRecipesFromDataBaseByName = async (title) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
    });

    const diets = recipes.map((recipe) => recipe.diets.map((d) => d.name));

    const formatedRecipes = recipes.map((recipe, index) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      diets: diets[index],
    }));

    return formatedRecipes;
  } catch (error) {
    console.log(error);
  }
};

const getRecipeFromDataBaseById = async (id) => {
  try {
    const recipeById = await Recipe.findOne({
      where: { id: id },
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    const diets = recipeById.diets.map((d) => d.name);
    const formatedRecipe = {
      id: recipeById.id,
      title: recipeById.title,
      image: recipeById.image,
      summary: recipeById.summary,
      healthScore: recipeById.healthScore,
      steps: recipeById.steps,
      diets: diets,
    };
    return formatedRecipe;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRecipesFromDataBase,
  getRecipesFromDataBaseByName,
  getRecipeFromDataBaseById,
};
