const validate = require("validate.js");

const checkSocialMediaFields = (socialMedia) => {
  let socialMediaValidation = [];
  socialMedia.forEach((element) => {
    // const index = socialMedia.indexOf(element);
    const constraints = {
      media: {
        presence: { allowEmpty: false },
      },
      user_id: {
        presence: { allowEmpty: false },
      },
    };

    socialMediaValidation.push(validate(element, constraints));
  });
  return socialMediaValidation;
};

module.exports = checkSocialMediaFields;
