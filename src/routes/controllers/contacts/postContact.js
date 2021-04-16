const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const createContact = require("../../../services/contact/createContact");
const jsonResponse = require("../../../services/createJsonResponse");
const searchContact = require("../../../services/contact/searchContact");

/*
expects:

req.body={
  "email": "myemail@myemail.com"
}
*/
const postContact = async (req, res) => {
  const { acl_role } = req;
  const minRole = "all_admins";

  let response, result;
  const data = { email: req.body.email };

  response = checkRolePermissions(acl_role, minRole);
  if (response) {
    return res.status(response.status).json(response);
  }

  // Check if email already exists
  result = await searchContact.byEmail(req.body.email);

  if (result.docs && result.docs.length > 0) {
    response = jsonResponse("409", "Contact already exists", result.docs);
    return res.status(response.status).json(response);
  } else {
    result = null;
  }

  result = await createContact(data);

  if (result.err) {
    response = jsonResponse("400", "Error creating contact", {
      err: result.err,
    });
  } else {
    let contactEmail = result.doc;
    response = jsonResponse(
      "200",
      "Successfully created contact",
      contactEmail
    );
  }
  res.status(response.status).json(response);
};

module.exports = postContact;
