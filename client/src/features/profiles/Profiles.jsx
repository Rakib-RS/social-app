import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../app/actions/profileAction";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <div>loading</div>;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile =>(
          <ProfileItem key={profile._id} profile={profile}/>
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <h1 className="display-4 text-center">Developer profiles</h1>

              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const maptoState = (state) => ({
  profile: state.profile,
});
export default connect(maptoState, { getProfiles })(Profiles);
