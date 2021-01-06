const checkContactFields = require("../../../services/contact/checkContactFields");
const jsonResponse = require("../../../services/createJsonResponse");
const searchContact = require("../../../services/contact/searchContact");
const updateContact = require("../../../services/contact/updateContact");

const putContact = async (req, res) => {
  let response, result;
  const { getEmailfromContactId } = searchContact;
  const id = req.params.contact_id;
  const data = req.body;

  // Validate input fields
  const contactValidationResults = checkContactFields(req);
  for (var key in contactValidationResults) {
    if (contactValidationResults[key] !== undefined) {
      response = jsonResponse(
        "400",
        "Input field errors",
        contactValidationResults
      );
      return res.status(response.status).json(response);
    }
  }

  // Update
  const email = await getEmailfromContactId(id);
  data.email = email;

  // console.log(data);

  result = await updateContact(data, id);
  // console.log(result);
  if (result.err) {
    response = jsonResponse("400", "Error updating contact", result.err);
  }

  response = jsonResponse("200", "Successfully updated contact", result.doc);

  console.log(response);

  res.status(response.status).json(response);
};

module.exports = putContact;
