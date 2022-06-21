const { business } = require("../models/index");

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

const userQueryAttributes = () => {
  return ["uuid", "role", "email", "first_name", "last_name"];
};

module.exports = { includeBusinesses, userQueryAttributes };
