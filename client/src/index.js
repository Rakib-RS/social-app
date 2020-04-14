import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from './app/store/configureStore';
import setAuthToken from "./app/utilis/setAuthToken";
import { setCurrentUser, logoutUser } from "./app/actions/authAction";
import jwt_decode from 'jwt-decode'
const rootEl = document.getElementById("root");

//console.log(store.getState());
const store = configureStore();
//check for toekn
if(localStorage.jwtToken){
  //set auth token auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user inf and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    //clean current user
    //redirect to login
    window.location.href = '/login';
  }
}
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};
if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}
render();
serviceWorker.unregister();
