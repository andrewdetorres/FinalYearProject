import axios from "axios";

const setAuthToken = token => {
  //if the token exists, apply it to every request
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
