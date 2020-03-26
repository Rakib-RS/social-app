const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";
  
  if (validator.isEmpty(data.text)) {
    errors.text= "text field is required";
  }
  if (!validator.isLength(data.text,{min:10,max:1000})) {
    errors.text = "text  must be between 10 and 1000 character";
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
