import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/recipes/";

const getAllRecipes = () => {
  return axios.get(API_URL, { headers: authHeader() });
}

const getRecipeById = (recipeId) => {
  return axios.get(API_URL + recipeId, { headers: authHeader() });
}

const addRecipe = (recipe) => {
  return axios.post(API_URL, recipe, { headers: authHeader() });
}

const exportedObj = {
  getAllRecipes,
  getRecipeById,
  addRecipe
}

export default exportedObj;