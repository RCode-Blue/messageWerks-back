const jsonResponse = require("../../../services/createJsonResponse");
const searchContact = require("../../../services/contact/searchContact");
const updateContact = require("../../../services/contact/updateContact");

const putContact = async (req, res) => {
  let response, result;
  const { getEmailfromContactId } = searchContact;
  const id = req.params.contact_id;
  const data = req.body;

  // Update
  const email = await getEmailfromContactId(id);
  data.email = email;

  result = await updateContact(data, id);
  if (result.err) {
    response = jsonResponse("400", "Error updating contact", result.err);
  }
  response = jsonResponse("200", "Successfully updated contact", result.doc);

  res.status(response.status).json(response);
};

module.exports = putContact;
