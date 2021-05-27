const EmailBody = require("../../../v1/db/models/EmailBody");

let foundEmailBodies;

const all = async () => {
  let result = {
    err: null,
    docs: null,
  };

  try {
    foundEmailBodies = await EmailBody.find({});
    result.docs = foundEmailBodies;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = { all };
