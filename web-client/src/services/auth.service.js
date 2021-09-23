/*
  The service uses Axios for HTTP requests and Local Storage for user information & JWT.
  It provides following important functions:

  login(): POST {username, password} & save JWT to Local Storage
  logout(): remove JWT from Local Storage
  register(): POST {username, email, password}
  getCurrentUser(): get stored user information (including JWT)
*/

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (fullname, username, password) => {
  return axios.post(API_URL + "signup", {
    fullname,
    username,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("authData", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("authData");
};

const getAuthData = () => {
  return JSON.parse(localStorage.getItem("authData"));
};

const exportedObj = {
  register,
  login,
  logout,
  getAuthData
};

export default exportedObj;