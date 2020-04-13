import { combineReducers } from 'redux';

import registerReducer from '../../features/Register/registerReducer';
import errorReducer from '../../features/Register/errorReducer';
import authReducer from '../reducer/authReducer';

export default combineReducers({
  auth: registerReducer,
  errors:errorReducer,
  login:authReducer
  
});
