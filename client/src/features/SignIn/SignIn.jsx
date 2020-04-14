import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {loginUser} from '../../app/actions/authAction';
import PropTypes from 'prop-types';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user)
  }
  componentDidMount(){
    if(this.props.login.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
    if(nextProps.login.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Sign In</h1>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Enter Email Address"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email} </div>
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
                  {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
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
SignIn.propTypes ={
  loginUser:PropTypes.func.isRequired,
  login:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
const maptoState = (state) =>({
  login:state.login, 
  errors:state.errors
})
export default connect(maptoState,{loginUser}) (SignIn);
