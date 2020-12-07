const Business = require("../../../db/models/Business");

const responseTemplates = require("../../../config/responseTemplates.json");

const deleteBusiness = async (req, res) => {
  // console.log(req.body.business_id);

  const id = req.body.business_id;
  let response;

  try {
    await Business.findByIdAndDelete({ _id: id });
  } catch (err) {
    response = responseTemplates._500;
    response.message = err.message;
    return res.status(response.status).json(response);
  }
  response = responseTemplates._200;
  response.message = "Successfully deleted";
  return res.status(response.status).json(response);

  // res.send({ message: "Business DELETE" });
};

module.exports = deleteBusiness;
