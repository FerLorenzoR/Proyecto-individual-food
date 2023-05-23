import axios from "axios";
const dataBase = "http://localhost:3001/recipes";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_SEARCH_RECIPE_BY_NAME = "GET_SEARCH_RECIPE_BY_NAME";
export const POST_CREATE_RECIPE = "POST_CREATE_RECIPE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_SORT_OPTION = "SET_SORT_OPTION";

export const getAllRecipes = (sortOption = "") => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    // const cachedRecipes = getState().recipes.allRecipes;

    // if (cachedRecipes.length > 0) {
    //   // Si hay recetas en caché, utiliza las recetas almacenadas en lugar de hacer la solicitud a la API
    //   dispatch({ type: GET_ALL_RECIPES, payload: cachedRecipes });
    //   return;
    // }
    try {
      const response = await axios.get(dataBase);
      const recipes = await response.data;

      // Realizar el ordenamiento según la opción seleccionada
      if (sortOption === "Desc") {
        // Ordenar de forma descendente
        recipes.sort((a, b) => {
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
          return 0;
        });
      } else if (sortOption === "Asc") {
        // Ordenar de forma ascendente
        recipes.sort((a, b) => {
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        });
      } else if (sortOption === "Diets") {
        // Ordenar por tipo de dietas
        recipes.sort((a, b) => {
          if (a.diets < b.diets) return -1;
          if (a.diets > b.diets) return 1;
          return 0;
        });
      } else if (sortOption === "Origen") {
        // Ordenar de forma descendente
        recipes.sort((a, b) => {
          if (a.id.length > b.id.length) return -1;
          if (a.id.length < b.id.length) return 1;
          return 0;
        });
      } else if (sortOption === "healthScore") {
        // Ordenar por puntuación de comida saludable
        recipes.sort((a, b) => {
          if (a.healthScore > b.healthScore) return -1;
          if (a.healthScore < b.healthScore) return 1;
          return 0;
        });
      }
      dispatch({ type: GET_ALL_RECIPES, payload: recipes });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getRecipeById = (id) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${dataBase}/${id}`);
      const recipeById = await response.data;
      dispatch({ type: GET_RECIPE_BY_ID, payload: recipeById });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getSearchRecipeByName = (title) => {
  return async function (dispatch) {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(`${dataBase}/?title=${title}`);
      const recipeByName = await response.data;
      dispatch({ type: GET_SEARCH_RECIPE_BY_NAME, payload: recipeByName });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const postCreateRecipe = (recipe) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${dataBase}/create`, recipe);
      const recipeCreated = await response.data;
      dispatch({ type: POST_CREATE_RECIPE, payload: recipeCreated });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};

export const setPagination = (currentPage, totalPages) => {
  return {
    type: SET_PAGINATION,
    payload: {
      currentPage,
      totalPages,
    },
  };
};
export const setSortOption = (option) => {
  return {
    type: SET_SORT_OPTION,
    payload: option,
  };
};

// export const getAllRecipes = () => {
//   return async function (dispatch) {
//     dispatch(setLoading(true));
//     try {
//       const response = await axios.get(dataBase);
//       const recipes = await response.data;

//       dispatch({ type: GET_ALL_RECIPES, payload: recipes });
//     } catch (error) {
//       dispatch(setError(error.message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// };
