import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, setPagination } from "../../redux/actions";
import { Route, Switch } from "react-router-dom";
import RecipeList from "../RecipeList/RecipeList";
import RecipeDetail from "../RecipeDetail/RecipeDetail";
import Pagination from "../Pagination/Pagination";
import SortOption from "../SortOption/SortOption";
import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const sortOption = useSelector((state) => state.sortOption);

  const { currentPage, totalPages } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(getAllRecipes(sortOption));
  }, [dispatch, currentPage, totalPages, sortOption]);

  const handlePageChange = (page) => {
    dispatch(setPagination(page, totalPages));
  };

  const getPageRecipes = () => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;

    return recipes.slice(startIndex, endIndex);
  };

  if (recipes) {
    const pageRecipes = getPageRecipes();

    return (
      <div className="home-container">
        <div className="content-container">
          <div className="title-container">
            <h1 className="title">Recetas</h1>
          </div>
          <div className="sort-container">
            <SortOption />
          </div>
          <RecipeList recipes={pageRecipes} />
        </div>
        <Switch>
          <Route path="/recipes/detail/:id">
            <RecipeDetail />
          </Route>
        </Switch>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recipes.length / 9)}
          onPageChange={handlePageChange}
        />
      </div>
    );
  } else {
    return (
      <div>
        <strong>Loading...</strong>
      </div>
    );
  }
};

export default Home;
