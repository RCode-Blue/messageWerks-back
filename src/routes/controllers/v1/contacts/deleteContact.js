// const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const removeContact = require("../../../../services/v1/contact/removeContact");
const jsonResponse = require("../../../../services/v1/createJsonResponse");

/**
 * @description Deletes a contact
 *
 * @module
 * @name deleteContact
 *
 * @param {object} req Request object
 * @param {string} req.userId ID of User
 * @param {string} req.acl_role Type of User account
 * @param {string} req.params.contact_id ID of Contact
 * @param {object} res Response object
 *
 * @returns {object} response - Refer Type Definitions
 * @returns {object} response.data - Array of Contacts
 * @returns {string} response.data._id - Contact id
 * @returns {string} response.data.email - Contact email
 * @returns {string} response.result - Outcome of query
 */
const deleteContact = async (req, res) => {
  const { userId, acl_role } = req;
  const id = req.params.contact_id;
  // const minRole = "all_admins";

  let response;

  // response = checkRolePermissions(acl_role, minRole);
  // if (response) {
  //   return res.status(response.status).json(response);
  // }

  response = await removeContact(id);
  // if (result.err || result.doc === null) {
  //   response = jsonResponse("400", "Error deleting Contact", result);
  // } else {
  //   response = jsonResponse("200", "Successfully deleted contact", result);
  // }
  res.status(response.status).json(response);
};

module.exports = deleteContact;
