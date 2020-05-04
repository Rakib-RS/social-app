import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/rootReducer";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
const middleware = [thunk];
const initialState = {};

const configureStore = () => {
  const store = createStore(
     rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
      
    )
  );  

  return store;
};
export default configureStore;
