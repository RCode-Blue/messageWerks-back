const jsonResponse = require("../../../services/createJsonResponse");
const createContact = require("../../../services/contact/createContact");
const searchContact = require("../../../services/contact/searchContact");

const postContact = async (req, res) => {
  let response, result;
  const { findContactByEmail } = searchContact;
  const data = { email: req.body.email };

  // Check if email already exists
  result = await findContactByEmail(req.body.email);

  if (result.docs && result.docs.length > 0) {
    response = jsonResponse("400", "Contact already exists", result.docs);
    return res.status(response.status).json(response);
  } else {
    result = null;
  }

  result = await createContact(data);

  response = result.err
    ? jsonResponse("400", "Error creating contact", result.err)
    : jsonResponse("200", "Successfully created contact", result.doc);

  return res.status(response.status).json(response);
};

module.exports = postContact;
