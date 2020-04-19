import axios from 'axios';
import {PROFILE_LOADING,GET_PROFILE,GET_PROFILES,CLEAR_CURRENT_PROFILE,GET_ERRORS} from './types';

export const getCurrentProfile = () => (dispatch) =>{
    dispatch(setProfileLoading());

    axios
        .get('/api/profile')
        .then(res =>{
            dispatch({
                type:GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type:GET_PROFILE,
                payload:{}
            })
        })
}
//profile loading
export const setProfileLoading = () =>{
    return{
        type:PROFILE_LOADING
    }
} 
//clear current profile
export const clearProfile = () =>{
    return{
        type:CLEAR_CURRENT_PROFILE
    }
} 