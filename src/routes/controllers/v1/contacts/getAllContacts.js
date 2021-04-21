const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const fetchAllContacts = require("../../../../services/v1/contact/fetchAllContacts");
const processFetchResponse = require("../../../../services/v1/processFetchResponse");

/**
 * @description Gets all Contacts
 *
 * @module
 * @name getAllContacts
 *
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
  let result = await fetchAllContacts();
  response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getAllContacts;
