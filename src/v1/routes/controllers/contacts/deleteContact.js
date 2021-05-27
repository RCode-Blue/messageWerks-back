// const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const removeContact = require("../../../services/contact/removeContact");
const jsonResponse = require("../../../services/createJsonResponse");

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

  let response = await removeContact(id);
  res.status(response.status).json(response);
};

module.exports = deleteContact;
