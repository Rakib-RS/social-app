import {TEST_DISPATCH} from './type'

export const registerUser = (userData) =>{
    return{
        type:TEST_DISPATCH,
        payload:userData
    }
}