const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  if (validator.isEmpty(data.handle)) {
    errors.handle = "handle field is required";
  }
  if(!validator.isLength(data.handle,{min:2 ,max:40})){
    errors.handle = "handle needs to between 2 and 4 characters"
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }
  if(!isEmpty(data.website)){
    if(!validator.isURL(data.website)){
      errors.website ="url is invalid"
    }
  }
  if(!isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)){
      errors.youtube ="url is invalid"
    }
  }
  if(!isEmpty(data.facebook)){
    if(!validator.isURL(data.facebook)){
      errors.facebook ="url is invalid"
    }
  }
  if(!isEmpty(data.linkedin)){
    if(!validator.isURL(data.linkedin)){
      errors.linkedin ="url is invalid"
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
