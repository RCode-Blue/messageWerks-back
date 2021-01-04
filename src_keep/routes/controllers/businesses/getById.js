const Business = require("../../../db/models/Business");

const responseTemplates = require("../../../config/responseTemplates.json");

const getBusinessById = async (req, res) => {
  const id = req.params.business_id;

  // const id = req.body.business_id;
  let response, business;
  // let business

  try {
    business = await Business.findById({ _id: id });
  } catch (err) {
    response = responseTemplates._500;
    response.message = err.message;
    return res.status(response.status).json(response);
  }
  response = responseTemplates._200;
  response.message = "Success";
  response.data = business;
  return res.status(response.status).json(response);
};

module.exports = getBusinessById;
