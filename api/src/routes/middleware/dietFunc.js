const { Diet } = require("../../db.js");
const { API_KEY } = process.env;
const API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
const axios = require("axios");

const getDiets = async () => {
  const dataDb = await Diet.findAll();
  if (dataDb.length) return dataDb;

  try {
    const dietApiData = await axios.get(API);
    const allDiets = dietApiData.data.results.map((d) => d.diets).flat();
    const uniqueDiets = [...new Set(allDiets)]; // Filtrar dietas duplicadas

    const createdDiets = await Diet.bulkCreate(
      uniqueDiets.map((name) => ({ name }))
    );

    return createdDiets;
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = {
  getDiets,
};
