const { check } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        check("name", "Name is required").exists(),
        check("email", "Email is required").exists(),
        check("email", "Email is invalid").isEmail(),
        check("password", "Password is required").exists(),
      ];
    }
    case "loginUser": {
      return [
        check("email", "Email is required").exists(),
        check("email", "Email is invalid").isEmail(),
        check("password", "Password is required").exists(),
      ];
    }
  }
};

module.exports = validate;
