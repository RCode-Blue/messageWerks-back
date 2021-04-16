const createContact = require("../../../services/contact/createContact");
const jsonResponse = require("../../../services/createJsonResponse");

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
