export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER_DATA = "SET_USER_DATA";
export const SET_FAV_MOVIES = "SET_FAV_MOVIES";
export const REMOVE_FAV_MOVIE = "REMOVE_FAV_MOVIE";
export const ADD_FAV_MOVIE = "ADD_FAV_MOVIE";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserData(value) {
  return { type: SET_USER_DATA, value };
}

export function updateUserData(value) {
  return { type: UPDATE_USER_DATA, value };
}

export function setFavMovies(value) {
  return { type: SET_FAV_MOVIES, value };
}
export function removeFavMovie(movieID) {
  return { type: REMOVE_FAV_MOVIE, movieID };
} 

export function addFavMovie(movie) {
  return { type: ADD_FAV_MOVIE, movie };
}
