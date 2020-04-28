import { combineReducers } from 'redux';

import registerReducer from '../../features/Register/registerReducer';
import errorReducer from '../../features/Register/errorReducer';
import authReducer from '../reducer/authReducer';
import profileReducer from '../reducer/profileReducer';
import postReducer from '../reducer/postReducer';

export default combineReducers({
  auth: registerReducer,
  errors:errorReducer,
  login:authReducer,
  profile:profileReducer,
  post:postReducer
  
});
