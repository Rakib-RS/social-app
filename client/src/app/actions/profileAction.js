import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "./types";

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};
//create Profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//add exp
export const addExperience = (addExp,history) => dispatch =>{
  axios
      .post('/api/profile/experience',addExp)
      .then( res => history.push('/dashboard'))
      .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      }))
}

//add education

export const addEducation = (addEdu,history) => dispatch =>{
  axios
      .post('/api/profile/education',addEdu)
      .then( res => history.push('/dashboard'))
      .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      }))
}

//delete exp
export const deleteExperience = (id) => dispatch =>{
  axios
      .delete(`/api/profile/experience/${id}`)
      .then( res => dispatch({
        type:GET_PROFILE,
        payload:res.data
      }))
      .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
      }))
}


//delete Profile and account
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};
//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
//clear current profile
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
