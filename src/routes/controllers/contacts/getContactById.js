const Contact = require("../../../db/models/Contact");
const fetchContactById = require("../../../services/contact/fetchContactById");

const jsonResponse = require("../../../services/createJsonResponse");

const getContactById = async (req, res) => {
  let response;
  const id = req.params.contact_id;

  response = await fetchContactById(id);

  res.status(response.status).json(response);
};

module.exports = getContactById;
