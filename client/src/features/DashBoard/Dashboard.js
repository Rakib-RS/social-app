import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from "../../app/actions/profileAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e){
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.login;
    const { profile, loading } = this.props.profile;
    let dashBoardContent;
    if (profile == null || loading) {
      dashBoardContent = (
        <div>
          {" "}
          <h4>loading</h4>
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">
              Welcome
              <Link to={`/profile/${profile.handle}`}>
                {} {user.name}
              </Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>you have not yet setup a profile,please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const maptoStateProps = (state) => ({
  login: state.login,
  profile: state.profile,
});
Dashboard.propTypes = {
  login: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
export default connect(maptoStateProps, { getCurrentProfile,deleteAccount })(Dashboard);
