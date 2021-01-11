const validate = require("validate.js");

const checkMediaFields = (name) => {
  const { first_name, family_name } = name;

  const constraints = {
    first_name: {
      presence: { allowEmpty: false },
    },
    family_name: {
      presence: { allowEmpty: false },
    },
  };

  return validate(name, constraints);
};

module.exports = checkMediaFields;
