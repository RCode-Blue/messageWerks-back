const Business = require("../../../db/models/Business");

const jsonTemplates = require("../../../config/responseTemplates.json");

const getAllBusinesses = async (req, res) => {
  let response;

  try {
    const allBusinesses = await Business.find();

    if (allBusinesses.length === 0) {
      response = jsonTemplates._404;
      res.status(response.status).json(response);
    }

    response = jsonTemplates._200;
    response.data = allBusinesses;
    res.status(response.status).json(response);
  } catch (err) {
    response = jsonTemplates._500;
    res.message = err.message;
    res.status(response.status).json(response);
  }
};

module.exports = getAllBusinesses;
