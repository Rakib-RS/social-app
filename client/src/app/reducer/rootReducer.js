import { combineReducers } from 'redux';

import registerReducer from '../../features/Register/registerReducer';

export default combineReducers({
  auth: registerReducer,
  
});
