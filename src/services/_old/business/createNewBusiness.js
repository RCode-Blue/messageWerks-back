const Business = require("../../../db/models/Business");

const createNewBusiness = async (data) => {
  let result = {
    docs: null,
    err: null,
  };

  // Create new business
  if (!data.status) {
    data.status = 7;
  }

  let businessId =
    data.name.replace(/[^a-zA-Z]/g, "").substring(0, 3) +
    Math.floor(Math.random() * 10000 + 1).toString();
  data.business_id = businessId;

  try {
    let docs = await Business.create(data);
    result.docs = docs;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = createNewBusiness;
