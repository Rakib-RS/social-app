import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import {connect} from 'react-redux';
import {registerUser} from './registerAction';

const mapStatetoProps =(state)=>({
  auth: state.auth
})

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser);

    // axios
    //   .post("/api/users/register", newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => this.setState({ errors: err.response.data }));
  }
  
  render() {
    const { name, email, password, password2, errors } = this.state;
    const {user} = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Sign In</h1>
              {user ? user.name: null}

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Enter your Name"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Enter Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="enter password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="enter password"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStatetoProps,{registerUser}) (SignUp);
