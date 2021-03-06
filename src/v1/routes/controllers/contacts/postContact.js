/**
 * @description Controller - Handles POST request for a Contact
 *
 * @module
 * @name postContact
 *
 * @requires checkRolePermissions
 * @requires createContact
 * @requires searchContacts
 *
 * @param {object} req - Request object
 * @param {object} req.acl_role - ACL role of logged-in user
 * @param {object} req.body.email - New Contact's email address
 * @param {object} res - Response object
 *
 * @returns {responseTemplate} res - Response object
 */

const appRoot = require("app-root-path");
// const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const createContact = require(appRoot +
  "/src/v1/services/contact/createContact");
const searchContacts = require(appRoot +
  "/src/v1/services/contact/searchContacts");

const postContact = async (req, res) => {
  // const { acl_role } = req;
  // const minRole = "all_admins";

  let response, result;
  const data = { email: req.body.email };

  // Check if email already exists
  result = await searchContacts.checkEmailExists(req.body.email);

  if (result.status === 409) {
    return res.status(result.status).json(result);
  }

  response = await createContact(data);

  res.status(response.status).json(response);
};

module.exports = postContact;
