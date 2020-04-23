import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFiledGroupInput from "../../app/common/form/TextFiledGroupInput";
import TextArea from "../../app/common/form/TextArea";
import {addExperience} from '../../app/actions/profileAction'
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
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
      const addExp ={
          company:this.state.company,
          title:this.state.title,
          location:this.state.location,
          from:this.state.from,
          to:this.state.to,
          current:this.state.current,
          description:this.state.description
      }
      this.props.addExperience(addExp,this.props.history);
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
      company,
      location,
      from,
      to,
      current,
      title,
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
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add Experice of your past</p>
              <small className="d-block pb-3">* = require fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFiledGroupInput
                  type='text'
                  placeholder="Enter the name of company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                
                <TextFiledGroupInput
                  type='text'
                  placeholder="Enter the title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFiledGroupInput
                  type='text'
                  placeholder="Enter the location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const maptoStateProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(maptoStateProps,{addExperience})(withRouter(AddExperience));
