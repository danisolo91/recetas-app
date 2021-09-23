import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/users/";

const getUser = (userId) => {
  return axios.get(API_URL + userId, { headers: authHeader() });
};

const exportedObj = {
  getUser
};

export default exportedObj;