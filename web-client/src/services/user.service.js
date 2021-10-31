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

const updateProfileImage = (userId, profileImageFD) => {
  let path = userId + '/profile-image';
  return axios.put(API_URL + path, profileImageFD, { headers: authHeader() });
}

const updateProfile = (userId, profile) => {
  return axios.put(API_URL + userId, profile, { headers: authHeader() });
}

const exportedObj = {
  getUser,
  getUserRecipes,
  updateProfileImage,
  updateProfile
};

export default exportedObj;