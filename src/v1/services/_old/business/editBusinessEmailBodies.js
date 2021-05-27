const Business = require("../../../v1/db/models/Business");
const findBusinesses = require("./findBusinesses");

const pull = async (businessId, bodyId) => {
  let result = {
    err: null,
    doc: null,
    result: null,
  };
  let foundBusiness;

  try {
    let searchResult = await findBusinesses.byId(businessId);
    if (searchResult.err) {
      result.err = searchResult.err;
      return result;
    }

    if (!searchResult.docs) {
      result.result = { message: "business not found" };
      return result;
    }

    foundBusiness = searchResult.docs;

    updateResult = foundBusiness.email_bodies.pull(bodyId);
    await foundBusiness.save();
    // console.log(result);

    result.result = updateResult;
  } catch (err) {
    result.err = err;
  }
  // console.log(result);
  return result;
};

module.exports = { pull };
