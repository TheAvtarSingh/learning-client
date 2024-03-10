// actions.js
import { SET_LOGGED_IN_USER } from './actionTypes';

export const setLoggedInUser = user => ({
  type: SET_LOGGED_IN_USER,
  payload: user,
});