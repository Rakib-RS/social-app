import { combineReducers } from 'redux';

import registerReducer from '../../features/Register/registerReducer';
import errorReducer from '../../features/Register/errorReducer';

export default combineReducers({
  auth: registerReducer,
  errors:errorReducer
  
});
