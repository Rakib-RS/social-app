import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFiledGroupInput from "../../app/common/form/TextFiledGroupInput";
import SelectList from "../../app/common/form/SelectList";
import TextArea from "../../app/common/form/TextArea";
import InputGroup from "../../app/common/form/InputGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInput: false,
      handle: "",
      company: "",
      website: "",
      status: "",
      location: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const {
    displaySocialInput,
      errors,
      handle,
      company,
      status,
      website,
      skills,
      facebook,
      youtube,
      linkedin,
      location,
      githubusername,
      bio,
    } = this.state;
    const options = [
      { label: "* select Professional status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Student", value: "Student" },
      { label: "Other", value: "Other" },
    ];
    let socialInput;
    if(displaySocialInput){
      socialInput =(
        <div>
          <InputGroup
            placeholder='Facebook URL'
            name='facebook'
            value={facebook}
            onChange={this.onChange}
            icon='fab fa-facebook'
            error={errors.facebook}
          />
           <InputGroup
            placeholder='youtube URL'
            name='youtube'
            value={youtube}
            onChange={this.onChange}
            icon='fab fa-youtube'
            error={errors.youtube}
          />
           <InputGroup
            placeholder='linkedin URL'
            name='linkedin'
            value={linkedin}
            onChange={this.onChange}
            icon='fab fa-linkedin'
            error={errors.linkedin}
          />
        </div>
      )
    }
    return (
      <div className="create-profile">
        <div className="conatiner">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">create your profile</h1>
              <p className="lead text-center">let's get some information</p>
              <small className="d-block pb-3">* = required fileds</small>
              <form onSubmit={this.onSubmit}>
                <TextFiledGroupInput
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <SelectList
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />
                <TextFiledGroupInput
                  placeholder="* company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFiledGroupInput
                  placeholder="* website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextFiledGroupInput
                  placeholder="* location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFiledGroupInput
                  placeholder="* Skills ex:html,css,javascript"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                />
                <TextFiledGroupInput
                  placeholder="* githubusername"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                />
                <TextArea
                  placeholder="bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState((preState) => ({
                        displaySocialInput: !preState.displaySocialInput,
                      }));
                    }}
                  >
                    Add social network
                  </button>
                  <span className='text-muted'>Optional</span>
                </div>
                {socialInput}
                <input type='submit' value='Submit' className='btn btn-info'/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const maptoStateProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(maptoStateProps)(CreateProfile);
