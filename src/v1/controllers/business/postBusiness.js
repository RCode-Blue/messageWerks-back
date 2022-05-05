const Business = require("../../../models").business;
const jsonResponse = require("../../../helpers/jsonResponse");

const postBusiness = async (data) => {
  let response;
  try {
    await Business.sync();
    let result = await Business.create(data);
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = postBusiness;
