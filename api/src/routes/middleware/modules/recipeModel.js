const recipeModel = (obj) => {
  const {
    id = "",
    title = "",
    image = "",
    summary = "",
    healthScore = 0,
    diets = [],
    analyzedInstructions = [],
  } = obj || {};

  const instructions = analyzedInstructions[0]?.steps || [];
  const mappedInstructions = instructions.map((instruction) => ({
    number: instruction.number,
    step: instruction.step,
    // ingredients:
    //   instruction.ingredients?.map((ingredient) => ({
    //     name: ingredient.name,
    //   })) || [],
  }));
  const regex = /<[^>]+>/g;
  const textoLimpio = summary.replace(regex, "");

  return {
    id,
    title,
    image,
    summary: textoLimpio,
    healthScore,
    steps: mappedInstructions,
    diets,
  };
};

module.exports = recipeModel;
