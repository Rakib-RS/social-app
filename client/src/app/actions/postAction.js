import axios from 'axios';
import {GET_ERRORS,GET_POST,GET_POSTS,ADD_POST, PROFILE_LOADING, DELETE_POST, CLEAR_ERROR} from './types'

//Add post 

export const addPost = (postData) => dispatch=>{
    dispatch(clearErrors());
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
//signle post display

export const postDisplay = (id) => dispatch =>{
    axios
        .get(`/api/posts/${id}`)
        .then(res => dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:null
        }))
}

//delte post

export const deletePost = (id) => dispatch=>{
    axios
        .delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type:DELETE_POST,
            payload:id
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}
export const addlike = (id) => dispatch=>{
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}
export const removelike = (id) => dispatch=>{
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const addComment = (id,commentData) => dispatch=>{
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${id}`,commentData)
        .then(res => dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

//delete a comment

export const deleteComment = (postId,commentId) => dispatch=>{
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const setProfileLoadig = () =>{
    return {
        type:PROFILE_LOADING
    }
}
export const clearErrors =() =>{
    return {
        type:CLEAR_ERROR
    }
}