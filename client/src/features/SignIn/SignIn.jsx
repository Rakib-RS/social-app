import React, { Component } from "react";

import { connect } from "react-redux";
import { loginUser } from "../../app/actions/authAction";
import PropTypes from "prop-types";
import TextFiledGroupInput from "../../app/common/form/TextFiledGroupInput";

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
    this.props.loginUser(user);
  }
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.login.isAuthenticated) {
      this.props.history.push("/dashboard");
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
                <TextFiledGroupInput
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                  error={errors.email}
                />
                <TextFiledGroupInput
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                  error={errors.password}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const maptoState = (state) => ({
  login: state.login,
  errors: state.errors,
});
export default connect(maptoState, { loginUser })(SignIn);
