const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.fname = !isEmpty(data.fname) ? data.fname : '';
  data.lname = !isEmpty(data.lname) ? data.lname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.email = !isEmpty(data.cemail) ? data.cemail : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : '';

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.fname)) {
    errors.fname = 'Name field is required';
  }
  if (!Validator.isLength(data.lname, { min: 2, max: 30 })) {
    errors.lname = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.lname)) {
    errors.lname = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.cemail)) {
    errors.cemail = 'Email field is required';
  }else {
    if (!Validator.equals(data.email, data.cemail)) {
      errors.cemail = 'Passwords must match';
    }
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.cpassword)) {
    errors.cpassword = 'Confirm Password field is required';
  } else {
    if (!Validator.equals(data.password, data.cpassword)) {
      errors.cpassword = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
