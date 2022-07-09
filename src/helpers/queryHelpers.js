const { business } = require("../models/index");

/**
 * @description Returns attributes of a Sequelize query for the Business model
 *
 * @function
 * @name includeBusinesses
 * @memberof helpers
 * @returns {object} fields from the Business model to be returned from the query
 */
const includeBusinesses = () => {
  return [
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
};

/**
 * @description Returns attributes of a Sequelize query for the User model
 *
 * @function
 * @name userQueryAttributes
 * @memberof helpers
 * @returns {object} fields from the User model to be returned from the query
 */
const userQueryAttributes = (queryType = null) => {
  if (queryType === "nameOnly") {
    return ["uuid", "first_name", "last_name"];
  } else {
    return ["uuid", "role", "email", "first_name", "last_name"];
  }
};

module.exports = { includeBusinesses, userQueryAttributes };
