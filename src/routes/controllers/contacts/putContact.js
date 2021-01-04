const Contact = require("../../../db/models/Contact");

const checkContactFields = require("../../../services/contact/checkContactFields");
// const checkIdExists = require("../../middleware/checkIdExists");
// const searchContact = require("../../../services/contact/searchContact");

const jsonResponse = require("../../../services/createJsonResponse");

const putContact = async (req, res) => {
  let response, foundContact;
  let contactValidationResults;

  const id = req.params.contact_id;
  contactValidationResults = checkContactFields(req);

  const email = (await Contact.findById(id)).email;

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

  let data = req.body;
  data.email = email;
  const filter = { _id: id };
  let options = {
    new: true,
    upsert: false,
    omitUndefined: true,
    overwrite: true,
  };

  try {
    let contact = await Contact.findOneAndUpdate(filter, data, options);
    response = jsonResponse("200", "Successfully updated Contact", contact);
  } catch (err) {
    response = jsonResponse("400", "Server error", err);
  }

  res.status(response.status).json(response);
};

module.exports = putContact;
