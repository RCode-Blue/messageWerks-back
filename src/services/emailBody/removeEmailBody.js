const EmailBody = require("../../db/models/EmailBody");

let result = {
  err: null,
  doc: null,
  result: null,
};
const byCode = async (code) => {
  const filter = { emailbody_codename: code };
  try {
    result.result = await EmailBody.findOneAndRemove(filter);
  } catch (err) {
    result.err = err;
  }
  return result;
};

const byId = async (id) => {
  // const filter = {id}
  try {
    result.result = await EmailBody.findByIdAndRemove(id);
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = { byCode, byId };
