// import jwt_decode from "jwt-decode";
import * as Cookies from "js-cookie";
const AUTH_TOKEN_KEY = "authToken";
const USER_ID = "userId";
import store from "../store/index";

export function setAuthToken(token) {
  Cookies.set(AUTH_TOKEN_KEY, token);
}
export function setUserId(userId) {
  Cookies.set(USER_ID, userId);
}

export function getAuthToken() {
  return Cookies.get(AUTH_TOKEN_KEY);
}

export function isLoggedIn() {
  const authToken = store.state.authToken;
  return !!authToken;
}

export function isCurrentUser() {
  const currentUser = store.state.currentUser;
  return !!currentUser;
}

// function getTokenExpirationDate(encodedToken) {
//   const token = jwt_decode(encodedToken);
//   if (!token.exp) {
//     return null;
//   }
//   return token.exp;
// }

export function logoutUser() {
  store.dispatch("clearCurrentUser");
  sessionStorage.clear();
  localStorage.clear();
  clearAuthToken();
  clearUserId();
}

export function clearAuthToken() {
  return Cookies.remove(AUTH_TOKEN_KEY);
}

export function clearUserId() {
  return Cookies.remove(USER_ID);
}
// export function userRole() {
//   return store.state.authentication.role;
// }
// export function isTokenActive(token) {
//   const expirationDate = getTokenExpirationDate(token);
//   const now = Math.floor(Date.now() / 1000);
//   return expirationDate > now;
// }
