const jsonResponse = require("../../../helpers/jsonResponse");
const Business = require("../../../models").business;

const byUuid = async (uuid) => {
  let response;
  try {
    let result = await Business.findOne({
      where: { uuid },
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};
module.exports = { byUuid };
