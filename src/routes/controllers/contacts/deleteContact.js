const { result } = require("validate.js");
const removeContact = require("../../../services/contact/removeContact");
const jsonResponse = require("../../../services/createJsonResponse");

const deleteContact = async (req, res) => {
  const id = req.params.contact_id;
  let response;

  result = await removeContact(id);
  if (result.err) {
    response = jsonResponse("400", "Error deleting Contact", result);
  } else {
    response = jsonResponse("200", "Successfully deleted contact", result);
  }
  res.status(response.status).json(response);
};

module.exports = deleteContact;
