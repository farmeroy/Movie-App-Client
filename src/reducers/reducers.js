import { combineReducers } from "redux";
import {
  SET_FAV_MOVIES,
  REMOVE_FAV_MOVIE,
  ADD_FAV_MOVIE,
  UPDATE_USER_DATA,
  SET_USER_DATA,
  SET_FILTER,
  SET_MOVIES,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userData(state = "", action) {
  switch (action.type) {
    case SET_USER_DATA:
      return action.value;
    default:
      return state;
  }
}

function favMovies(state = [], action) {
  switch (action.type) {
    case SET_FAV_MOVIES:
      return action.value;
    case REMOVE_FAV_MOVIE:
      return state.filter(movie => movie !== action.movieID);
    case ADD_FAV_MOVIE:
      return [
        ...state,
        action.movie
      ]
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userData,
  favMovies
});

export default moviesApp;
