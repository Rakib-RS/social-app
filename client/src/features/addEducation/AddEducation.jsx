import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFiledGroupInput from "../../app/common/form/TextFiledGroupInput";
import TextArea from "../../app/common/form/TextArea";
import {addEducation} from '../../app/actions/profileAction'
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: null,
      current: false,
      description: "",
      errors: {},
      disabled: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  onSubmit(e){
      e.preventDefault();
      const addEdu ={
          school:this.state.school,
          degree:this.state.degree,
          fieldofstudy:this.state.fieldofstudy,
          from:this.state.from,
          to:this.state.to,
          current:this.state.current,
          description:this.state.description
      }
      this.props.addEducation(addEdu,this.props.history);
  }
  onChange(e){
      this.setState({[e.target.name]:e.target.value})
  }
  onCheck(e){
      this.setState({
          disabled:!this.state.disabled,
          current:!this.state.current
      })
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({
              errors:nextProps.errors
          })
      }
  }
  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      errors,
      disabled,
    } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                go back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add your education</p>
              <small className="d-block pb-3">* = require fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFiledGroupInput
                  type='text'
                  placeholder="Enter the name of school"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                
                <TextFiledGroupInput
                  type='text'
                  placeholder="Enter the degree"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFiledGroupInput
                  type='text'
                  placeholder="Enter the fieldofstudy"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h4>Date From</h4>
                <TextFiledGroupInput
                  type='date'
                  name="from"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h4>To Date</h4>
                <TextFiledGroupInput
                  type='date'
                  name="to"
                  value={to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={disabled ? 'disabled':''}
                />
                 <div className='form-check mb-4'>
                    <input

                        type='checkbox'
                        className='form-check-input'
                        name='current'
                        value={current}
                        checked={current}
                        onChange={this.onCheck}
                        id='current'
                    
                    />
                    <label htmlFor='current' className='form-check-label'>
                        current Job


                    </label>

                </div>
                <TextArea
                  type='text'
                  placeholder="description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                 
                />
               
                <input
                    type='submit'
                    value='Submit'
                    className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const maptoStateProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(maptoStateProps,{addEducation})(withRouter(AddEducation));
