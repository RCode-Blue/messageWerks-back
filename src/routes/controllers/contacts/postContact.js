const Contact = require("../../../db/models/Contact");
const jsonResponse = require("../../../services/createJsonResponse");

const postNewContact = async (req, res) => {
  let response;

  const data = req.body;
  const filter = { email: req.body.email };
  const settings = { new: true, upsert: true };

  try {
    let newContact = await Contact.findOneAndUpdate(filter, data, settings);

    response = jsonResponse("200", "Success", newContact);
  } catch (err) {
    response = jsonResponse("400", "Server error", err);
  }

  return res.status(response.status).json(response);
};

module.exports = postNewContact;
