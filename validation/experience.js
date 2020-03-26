const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperiencenput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  //data.to = !isEmpty(data.skills) ? data.skills : "";
  if (validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }
//   if(!validator.isLength(data.handle,{min:2 ,max:40})){
//     errors.handle = "handle needs to between 2 and 4 characters"
//   }
  if (validator.isEmpty(data.company)) {
    errors.company = "company is required";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "location field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
