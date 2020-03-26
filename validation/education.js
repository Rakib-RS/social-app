const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperiencenput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  //data.to = !isEmpty(data.skills) ? data.skills : "";
  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }
//   if(!validator.isLength(data.handle,{min:2 ,max:40})){
//     errors.handle = "handle needs to between 2 and 4 characters"
//   }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree is required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
