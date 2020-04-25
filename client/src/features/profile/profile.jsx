import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../app/actions/profileAction";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import { Link } from "react-router-dom";

class profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <div>loading</div>;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Go Back
              </Link>
            </div>
            <div className="col-md-6" />
            <ProfileHeader profile={profile} />
            <ProfileCreds />
            <ProfileAbout />
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    );
  }
}
const maptoState = (state) => ({
  profile: state.profile,
});

export default connect(maptoState, { getProfileByHandle })(profile);
