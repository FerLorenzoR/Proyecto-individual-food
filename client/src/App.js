import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import CreateRecipe from "./Components/CreateRecipe/CreateRecipe";
import NavBar from "./Components/NavBar/NavBar";
import RecipeByName from "./Components/RecipeByName/RecipeByName";
import NotFound from "./Components/NotFound/NotFound";
function App() {
  return (
    <div className="app-container">
      <Switch>
        {/* Ruta para la página de inicio */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/recipes">
          <NavBar />
          <Switch>
            {/* Ruta para el componente Home */}
            <Route exact path="/recipes" component={Home} />
            {/* Ruta para la página de detalle de receta */}
            <Route exact path="/recipes/detail/:id" component={RecipeDetail} />
            {/* Ruta para crear una nueva receta */}
            <Route exact path="/recipes/create" component={CreateRecipe} />
            {/* Ruta para ver los detalles de una receta por nombre */}
            <Route exact path="/recipes/:name" component={RecipeByName} />
            {/* Ruta para la página 404 */}
          </Switch>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
