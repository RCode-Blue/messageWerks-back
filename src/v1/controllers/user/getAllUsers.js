/**
 * @description Handles GET request to get all users
 *
 * @module
 * @name getAllUsers
 * @requires jsonResponse
 * @returns {jsonResponse} Standardised JSON object with a list of all users, or error message
 */

const jsonResponse = require("../../../helpers/jsonResponse");
const { business } = require("../../../models");

const User = require("../../../models").user;

const getAllUsers = async () => {
  let response;
  const attributes = [
    "id",
    "role",
    "email",
    "first_name",
    "last_name",
    "password",
  ];
  let include = [
    {
      model: business,
      as: "businesses",
      attributes: [
        "name",
        "address_line1",
        "address_line2",
        "suburb",
        "state",
        "country",
        "postcode",
        "uuid",
        "id",
      ],
    },
  ];
  try {
    let result = await User.findAll({
      attributes,
      include,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = getAllUsers;
