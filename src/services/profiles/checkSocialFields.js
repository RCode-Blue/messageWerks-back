const validate = require("validate.js");

const checkSocialFields = (req) => {
  var constraints = {
    media: {
      presence: { allowEmpty: false },
    },
    userid: {
      presence: { allowEmpty: false },
    },
  };

  let validationResult = [];

  req.body.socialmedia.forEach((item) => {
    var result = validate(item, constraints);

    let resultObject = {};

    for (var k in result) {
      for (var v in result[k]) {
        resultObject[k.valueOf()] = result[k][v];
      }
    }
    validationResult.push(resultObject);
  });

  return validationResult;
};

module.exports = checkSocialFields;
