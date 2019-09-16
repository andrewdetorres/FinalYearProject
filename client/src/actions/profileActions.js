import axios from "axios";

//Import Types from types.js
import {
  GET_PROFILE,
  LOADING_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ALL_PROFILES
} from "./types";

//Get the current profile
export const getCurrentProfile = () => dispatch => {
  //Set the profile to loading while the axios request is taking place
  dispatch(setProfileLoading());

  //Carry out axios request to get the current users profile
  axios
    .get("api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Get all of the swimmers profiles.
export const getProfileByUsername = username => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get(`/api/profile/username/${username}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

//Create a new profile for a user.
export const createProfile = (profileInformation, history) => dispatch => {
  axios
    .post("/api/profile", profileInformation)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Delete the profile and the user
export const deleteUserAccount = () => dispatch => {
  axios
    .delete("/api/profile")
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {} //sets the auth user to no-one
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Record new injury
export const newInjury = (injuryData, username, history) => dispatch => {
  dispatch(setProfileLoading);
  axios
    .post(`/api/profile/injuries/${username}`, injuryData)
    .then(res => {
      history.push(`/swimmer/${username}`);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Record new blood pressure
export const newBloodPressure = (
  bloodPressureData,
  username,
  history
) => dispatch => {
  dispatch(setProfileLoading);
  axios
    .post(`/api/profile/bloodpressure/${username}`, bloodPressureData)
    .then(res => {
      history.push(`/swimmer/${username}`);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Record new blood pressure
export const newBPM = (BPMData, username, history) => dispatch => {
  dispatch(setProfileLoading);
  axios
    .post(`/api/profile/bpm/${username}`, BPMData)
    .then(res => {
      history.push(`/swimmer/${username}`);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Delete user injury
export const deleteInjury = injury_id => dispatch => {
  axios
    .delete(`/api/profile/injuries/${injury_id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Delete user BPM
export const deleteBPM = bpm_id => dispatch => {
  axios
    .delete(`/api/profile/bpm/${bpm_id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Delete user Blood Pressure
export const deleteBloodPressure = bloodpressure_id => dispatch => {
  axios
    .delete(`/api/profile/bloodpressure/${bloodpressure_id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Record new fiftyMetre race
export const newFiftyMetre = (fiftyData, username, history) => dispatch => {
  dispatch(setProfileLoading);
  axios
    .post(`/api/profile/fiftymetre/${username}`, fiftyData)
    .then(res => {
      history.push(`/swimmer/${username}`);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Record new hundredMetre race
export const newHundredMetre = (hundredData, username, history) => dispatch => {
  dispatch(setProfileLoading);
  axios
    .post(`/api/profile/hundredmetre/${username}`, hundredData)
    .then(res => {
      history.push(`/swimmer/${username}`);
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Get all of the swimmers profiles.
export const getSwimmerProfiles = () => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: null
      });
    });
};

//Get all of the swimmers profiles.
export const getRaceData = race => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get(`/api/profile/race/${race}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

//Set profile to loading while waiting for the profile to load (Async)
export const setProfileLoading = () => {
  return {
    type: LOADING_PROFILE
  };
};

//Set the profile back to null when a user logs out
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
