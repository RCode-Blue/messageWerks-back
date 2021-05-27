// const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const searchContact = require("../../../services/contact/searchContacts");

/**
 * @description Gets all Contacts
 *
 * @module
 * @name getAllContacts
 *
 * @param {object} req Request object
 * @param {object} res Response object
 *
 * @returns {object} response - Refer Type Definitions
 * @returns {object} response.data - Array of Contacts
 * @returns {string} response.data._id - Contact id
 * @returns {string} response.data.email - Contact email
 * @returns {string} response.data.social_media - Array of social media ids
 */
const getAllContacts = async (req, res) => {
  const minRole = "all_admins";

  // const { acl_role } = req;
  let response;

  // response = checkRolePermissions(acl_role, minRole);
  // if (response) {
  //   return res.status(response.status).json(response);
  // }
  response = await searchContact.all();

  res.status(response.status).json(response);
};

module.exports = getAllContacts;
