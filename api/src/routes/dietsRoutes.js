const { Router } = require("express");
const dietsRoute = Router(),
  { getDiets } = require("./middleware/dietFunc.js");

dietsRoute.get("/", async (req, res) => {
  try {
    res.status(200).json(await getDiets());
  } catch (error) {
    res.status(400).send("Error al guardar las dietas");
  }
});

module.exports = dietsRoute;

// dietsRoute.get("/", async (req, res) => {
//   try {
//     let dataDb = await Diet.findAll();
//     if (dataDb.length) return dataDb;
//     const dietsApiData = await axios.get(API);
//     const allDiets = dietsApiData.data.results.map((d) => ({
//       id: d.id,
//       name: d.diets,
//     }));
//     await Diet.bulkCreate(allDiets);
//     res.status(200).send(allDiets);
//   } catch (error) {
//     res.status(400).send(message.error);
//   }
// });
