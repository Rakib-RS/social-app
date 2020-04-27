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
import CreateProfile from "../../features/createProfile/CreateProfile";
import EditProfile from '../../features/editProfile/EditProfile';
import AddExperience from "../../features/addExperience/AddExperience";
import AddEducation from "../../features/addEducation/AddEducation";
import Profiles from "../../features/profiles/Profiles";
import profile from "../../features/profile/profile";
import NotFound from "../../features/notFound/NotFound";


class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:handle" component={profile} />
          <Route exact path="/profile/not-found" component={NotFound} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path ='/create-profile' component={CreateProfile}/>
            <PrivateRoute exact path ='/edit-profile' component={EditProfile}/>
            <PrivateRoute exact path ='/add-experience' component={AddExperience}/>
            <PrivateRoute exact path ='/add-education' component={AddEducation}/>
          </Switch>

          <Footer />
        </Container>
      </Fragment>
    );
  }
}

export default App;
