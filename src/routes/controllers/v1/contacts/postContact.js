const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const createContact = require("../../../../services/v1/contact/createContact");
const jsonResponse = require("../../../../services/v1/createJsonResponse");
const searchContact = require("../../../../services/v1/contact/searchContact");

/*
expects:

req.body={
  "email": "myemail@myemail.com"
}
*/

/**
 * @description Create new COntact
 *
 * @module
 * @name postContact
 *
 * @requires checkRolePermissions
 * @requires createContact
 * @requires jsonResponse
 * @requires searchContact
 *
 * @param {object} req - Request object
 * @param {object} req.acl_role - ACL role of loggen-in user
 * @param {object} res - Reaponse object
 */

const postContact = async (req, res) => {
  const { acl_role } = req;
  const minRole = "all_admins";

  let response, result;
  const data = { email: req.body.email };

  // response = checkRolePermissions(acl_role, minRole);
  // if (response) {
  //   return res.status(response.status).json(response);
  // }

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
