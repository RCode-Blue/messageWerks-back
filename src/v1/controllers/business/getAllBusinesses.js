const jsonResponse = require("../../../helpers/jsonResponse");

const Business = require("../../../models").business;

const getAllBusinesses = async () => {
  let response;

  const attributes = [
    "id",
    "name",
    "uuid",
    "address_line1",
    "address_line2",
    "suburb",
    "state",
    "country",
    "postcode",
  ];

  try {
    let result = await Business.findAll({
      attributes,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }

  return response;
};

module.exports = getAllBusinesses;