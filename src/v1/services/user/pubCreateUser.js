/**
 * @description Creates a User after verification
 *
 * @module
 * @name pubCreateUser
 *
 * @requires User
 * @requires createQueryResponse.postResponse
 *
 * @param {object} userData - User details
 *
 * @returns {responseTemplate} Custom JSON status response
 *
 */

const slug = require("slug");
const { postResponse } = require("../createQueryResponse");
const { user } = require("../../config/appValues.json");

const User = require("../../db/models/User");

const pubCreateUser = async (userData) => {
  const { email } = userData;
  let result, response;

  slug.charmap["@"] = "_";

  const slug = slug(email);
  const password = Math.floor(Math.random() + 10000) + 1;
  const status = user.status.disabled.code;
  const acl_role = user.acl_role.owner.code;

  const data = {
    email,
    slug,
    password,
    acl_role,
    status,
  };

  // Create User
  try {
    result = await User.create(data);

    response = postResponse(null, result);
  } catch (err) {
    response = postResponse(true, null.err);
  }
  // console.log(response);
  return response;
};
module.exports = pubCreateUser;
