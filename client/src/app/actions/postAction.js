import axios from 'axios';
import {GET_ERRORS,GET_POST,GET_POSTS,ADD_POST, PROFILE_LOADING} from './types'

//Add post 

export const addPost = (postData) => dispatch=>{
    axios
        .post('/api/posts',postData)
        .then(res => dispatch({
            type:ADD_POST,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

//get posts

export const getPosts = () => dispatch =>{
    dispatch(setProfileLoadig());
    axios
        .get('/api/posts')
        .then(res => dispatch({
            type:GET_POSTS,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_POSTS,
            payload:null
        }))


}

export const setProfileLoadig = () =>{
    return {
        type:PROFILE_LOADING
    }
}