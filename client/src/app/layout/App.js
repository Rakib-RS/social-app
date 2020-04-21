import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import Footer from "./footer";
import Landing from "./Landing";
//import { Router, Route } from 'react-router-dom';
import "./App.css";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import SignUp from "../../features/Register/SignUp";

import LoginForm from "../../features/SignIn/SignIn";
import Dashboard from "../../features/DashBoard/Dashboard";
import PrivateRoute from "../common/privateRoute";


class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={LoginForm} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>

          <Footer />
        </Container>
      </Fragment>
    );
  }
}

export default App;
