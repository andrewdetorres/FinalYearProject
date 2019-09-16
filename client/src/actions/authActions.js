import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";

//Import Types from types.js
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Sign up a new user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Login user
export const loginUser = userData => dispatch => {
  //post request to login passing the user data as the parameters
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // get the token
      const { token } = res.data;
      //set the token to localStorage
      localStorage.setItem("jwtToken", token);
      //set token to the auth header
      setAuthToken(token);
      //decode the token to get the user data
      const decodedToken = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//set the logged in user
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

//Log out the current user.
export const logoutCurrentUser = () => dispatch => {
  // Remove Token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future request
  setAuthToken(false);
  // set current user to an empty object, which in turn will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
