import {GET_ERRORS} from './type'
import axios from "axios";
export const registerUser = (userData,history) => dispatcher =>{
    axios
      .post("/api/users/register", userData)
      .then((res) => history.push('/login') )
      .catch((err) => 
        dispatcher({
            type:GET_ERRORS,
            payload:err.response.data
        })
      );
    
}