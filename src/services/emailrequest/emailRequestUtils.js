const appValues = require("../../config/appValues.json");

const getValues = () => {
  let data = {
    mjPubKey: process.env.MJ_API_KEY,
    mjPrivKey: process.env.MJ_SECRET_KEY,
    defaultFrom: appValues.email_bodies.default_from,
  };
  return data;
};

const verifyEmailType = (type) => {
  const emailTypes = appValues.email_bodies.types;
  let validCount = 0;
  emailTypes.forEach((element) => {
    if (element === type) {
      validCount++;
    }
  });

  return validCount === 1 ? true : false;
};

module.exports = { getValues, verifyEmailType };
