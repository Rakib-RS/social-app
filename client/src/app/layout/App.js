import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import Footer from "./footer";
import Landing from "./Landing";
//import { Router, Route } from 'react-router-dom';
import "./App.css";
import { Container} from "semantic-ui-react";
import {Route} from  'react-router-dom'

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <Route exact path='/' component={Landing}/>
          <Footer />
        </Container>
      </Fragment>
    );
  }
}

export default App;
