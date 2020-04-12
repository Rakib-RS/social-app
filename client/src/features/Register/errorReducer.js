import {GET_ERRORS} from './type';
const inititalState ={};
const errorReducer =(state=inititalState,action) =>{
    switch(action.type){
        case GET_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}
export default errorReducer;