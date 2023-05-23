const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipesRoute");
const dietsRoute = require("./dietsRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipes);
router.use("/diets", dietsRoute);

module.exports = router;
