//import action types
import { SET_CURRENT_USER } from "../actions/types";
import _ from "lodash";
//Create initial state
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload), //if the payload is empty, the user is not authenticated
        user: action.payload
      };
    default:
      return state;
  }
}
