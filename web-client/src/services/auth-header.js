/*
  Checks Local Storage for user item. 
  If there is a logged in user with accessToken (JWT), return HTTP Authorization header. 
  Otherwise, return an empty object.
*/

export default function authHeader() {
  const authData = JSON.parse(localStorage.getItem('authData'));

  if (authData && authData.accessToken) {
    return { Authorization: 'Bearer ' + authData.accessToken };
  } else {
    return {};
  }
}