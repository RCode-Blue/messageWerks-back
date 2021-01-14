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

const byBusinessId = async (id) => {
  try {
    searchResults.docs = await Business.findById(id).exec();
  } catch (err) {
    searchResults.err = err;
  }
  return searchResults;
};

const byName = async () => {};

const byClient = async () => {};

module.exports = { all, byBusinessId, byName, byClient };
