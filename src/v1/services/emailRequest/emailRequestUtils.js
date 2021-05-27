const appRoot = require("app-root-path");

const appValues = require(appRoot + "/src/v1/config/appValues.json");

const verifyEmailType = (type) => {
  const emailTypes = appValues.email_bodies.types;
  let ValidCount = 0;

  emailTypes.forEach((element) => {
    if (element === type) {
      validCount++;
    }
  });

  return validCount === 1 ? true : false;
};

module.exports = { verifyEmailType };
