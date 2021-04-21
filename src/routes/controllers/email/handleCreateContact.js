const createContact = require("../../../services/v1/contact/createContact");
const jsonResponse = require("../../../services/v1/createJsonResponse");

/**
 * @description Generates JSON object for COntact creation based on results
 *
 * @module
 * @name handleCreateContact
 *
 * @requires createContact
 * @requires jsonResponse
 *
 * @param {object} req Request object
 * @param {object} req.body.email Contact email
 * @param {object} res Response object
 */
const handleCreateContact = async (req, res) => {
  const { email } = req.body;
  let response;

  try {
    let createContactResult = await createContact({ email });
    response = jsonResponse(
      "200",
      "Successfully created Contact",
      createContactResult
    );
    // res.status(response.status).json(response);
    return createContactResult;
  } catch (err) {
    response = jsonResponse("400", "Error creating contact", err);
    res.status(response.status).json(response);
    return false;
  }
};
module.exports = handleCreateContact;
