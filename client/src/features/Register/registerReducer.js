import {TEST_DISPATCH} from './type';
const initialState ={
    isAuthenticated:false,
    user:{}
};
const registerReducer = (state = initialState,action)=>{
    switch(action.type ){
        case TEST_DISPATCH :
            return{
                ...state,
                user:action.payload
            }

        default:
             return state;

    }
    
}
export default registerReducer;