const Business = require("../../db/models/Business");

let projection = [];
let options = {};
let searchResults = {
  docs: null,
  err: null,
};

const all = async () => {
  try {
    searchResults.docs = await Business.find({});
  } catch (err) {
    searchResults.err = err;
  }
  return searchResults;
};

const byId = async (id) => {
  try {
    searchResults.docs = await Business.findById(id).exec();
  } catch (err) {
    searchResults.err = err;
  }
  return searchResults;
};

const byBusinessId = async (business_id) => {
  let filter = { business_id };
  try {
    let foundBusinesses = await Business.findOne(filter);
    searchResults.docs = foundBusinesses.docs;
  } catch (err) {
    searchResults.err = err;
  }
};

const byName = async () => {};

const byClient = async () => {};

module.exports = { all, byId, byBusinessId, byName, byClient };
