import axios from "axios";
import {GET_ERRORS,SET_CURRENT_USER} from  './types';
import setAuthToken from "../utilis/setAuthToken";
import jwt_decode from 'jwt-decode'

//Login - Get User Token

export const loginUser = (userData) => (dispatcher) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
        //save to localStorage
        const {token} =res.data;
        //set token to ls
        localStorage.setItem('jwtToken',token);
        //set token to authHeader
        setAuthToken(token);
        //decode token to get user data;
        const decoded = jwt_decode(token);
        dispatcher(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatcher({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const setCurrentUser =(decoded) =>{
  return{
    type:SET_CURRENT_USER,
    payload:decoded
  }
}
