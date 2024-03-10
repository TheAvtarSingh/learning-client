// reducer.js
import { SET_LOGGED_IN_USER } from './actionTypes';

const initialState = {
  loggedInUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;