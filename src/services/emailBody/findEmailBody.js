const EmailBody = require("../../db/models/EmailBody");

let foundEmailBody;
let result = {
  err: null,
  doc: null,
};

const byCode = async (code) => {
  // console.log(id);
  const filter = { emailbody_codename: code };
  const projection = [];
  const options = {};
  try {
    foundEmailBody = await EmailBody.findOne(filter, projection, options);
    // console.log(foundEmailBody);
    result.doc = foundEmailBody;
  } catch (err) {
    result.err = err;
  }
  return result;
  // return { doc: [] };
};

const byId = async (id) => {
  try {
    foundEmailBody = await EmailBody.findById(id);
    result.doc = foundEmailBody;
  } catch (err) {
    result.err = err;
  }
  return result;
};

const byType = async (type) => {
  let filter = { type };
  try {
    foundEmailBody = await EmailBody.findOne(filter);
    result.doc = foundEmailBody;
  } catch (err) {
    result.err = err;
  }

  return result;
};

const byBusinessTypeActive = async (type, businessid) => {
  let filter = { type, business: businessid, status: 9 };
  try {
    foundEmailBody = await EmailBody.findOne(filter);
    // console.log("foundEmailBody: ", foundEmailBody);

    result.doc = foundEmailBody;
    return result;
  } catch (err) {
    result.err = err;
    return result;
  }

  // console.log("result: ", result);
  // return result;
};

module.exports = { byCode, byId, byType, byBusinessTypeActive };
