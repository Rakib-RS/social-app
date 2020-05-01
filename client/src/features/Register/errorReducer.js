import {GET_ERRORS} from './type';
import { CLEAR_ERROR } from '../../app/actions/types';
const inititalState ={};
const errorReducer =(state=inititalState,action) =>{
    switch(action.type){
        case GET_ERRORS:
            return action.payload;
        case CLEAR_ERROR:
            return{};
        default: 
            return state;
    }
}
export default errorReducer;