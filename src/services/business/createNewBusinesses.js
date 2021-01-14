const Business = require("../../db/models/Business");

const createNewBusiness = async (data) => {
  // const { name } = req.body;

  // Check if company name already exists

  // Create new business
  try {
    let docs = await Business.create(data);
    return { docs };
  } catch (err) {
    return { err };
  }
};

module.exports = createNewBusiness;
