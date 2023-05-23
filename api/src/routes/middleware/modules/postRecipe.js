const { Recipe, Diet } = require("../../../db.js");

const modulePostRecipe = async (newRecipe) => {
  const recipe = await Recipe.create(newRecipe);
  const diets = await Diet.findAll({
    where: { id: newRecipe.dietId },
  });

  await recipe.addDiets(diets);

  return recipe;
};

module.exports = {
  modulePostRecipe,
};
