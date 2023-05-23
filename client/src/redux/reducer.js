import {
  GET_ALL_RECIPES,
  GET_RECIPE_BY_ID,
  GET_SEARCH_RECIPE_BY_NAME,
  POST_CREATE_RECIPE,
  SET_LOADING,
  SET_ERROR,
  CLEAN_DETAIL,
  SET_PAGINATION,
  SET_SORT_OPTION,
} from "./actions";

const initialState = {
  recipes: [],
  recipeById: {
    steps: [],
  },
  searchRecipeByName: [],
  createRecipe: {},
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
  },
  sortOption: "Desc",
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        error: null,
      };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeById: action.payload,
        error: null,
      };
    case GET_SEARCH_RECIPE_BY_NAME:
      return {
        ...state,
        searchRecipeByName: action.payload,
        error: null,
      };

    case POST_CREATE_RECIPE:
      return {
        ...state,
        createRecipe: action.payload,
        error: null,
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        },
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        sortOption: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        recipes: [],
        recipeById: {},
        searchRecipeByName: [],
        createRecipe: {},
        loading: false,
        error: null,
        sortOption: "",
      };

    default:
      return state;
  }
}
