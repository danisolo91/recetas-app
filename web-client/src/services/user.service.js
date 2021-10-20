import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/users/";

const getUser = (userId) => {
  return axios.get(API_URL + userId, { headers: authHeader() });
};

const getUserRecipes = (userId, page = 0, sort = 'createdAt,desc') => {
  let path = userId + '/recipes?page=' + page + '&sort=' + sort;
  return axios.get(API_URL + path, { headers: authHeader() });
}

const exportedObj = {
  getUser,
  getUserRecipes
};

export default exportedObj;