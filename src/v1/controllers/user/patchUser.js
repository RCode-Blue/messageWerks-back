/**
 * @description Handles PATCH requests for a User.
 * <br> Edits existing User data, except for password.
 * <br> User is located based on uuid.
 *
 * @module
 * @name patchUser
 */

const User = require("../../../models").user;

const findBusiness = require("../business/findBusiness");
const findUser = require("./findUser");
const jsonResponse = require("../../../helpers/jsonResponse");

/**
 * @description Edits User details
 *
 * @function
 * @name editUser
 * @requires jsonResponse
 * @param {object} userData
 * @param {string} [userData.email] - User email
 * @param {string} userData.uuid - User uuid
 * @param {integer} [userData.role] - User role
 * @param {string} [userData.first_name] - User first name
 * @param {string} [userData.last_name ] - User last name
 */
const editUser = async (userData) => {
  const { uuid } = userData;
  delete userData.uuid;
  if (userData.password) {
    delete userData.password;
  }
  let response;
  try {
    await User.sync();
    let result = await User.update(userData, {
      where: { uuid },
      returning: true,
    });
    // console.log("----- result -----");
    // console.log(result[1][0].dataValues);
    response = jsonResponse(200, "", result[1][0].dataValues);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }

  return response;
};

/**
 * @description Creates or removes a links between a User and a Business
 *
 * @function
 * @name linkBusiness
 * @param {object} linkData
 * @param {string} linkData.user_uuid - User's UUID
 * @param {string} linkData.business_uuid - UUID of business to be linked
 * @param {string} linkData.transactionType - Type of transaction (add or remove)
 */
const linkBusiness = async (linkData) => {
  let user, business, response;
  const { user_uuid, business_uuid, transactionType } = linkData;
  // Note: transactions can be either "add" or "remove"

  let userSearchResult = await findUser.byUuid(user_uuid);

  if (userSearchResult.status >= 400) {
    response = { ...userSearchResult };
  } else {
    user = userSearchResult.data;
    let businessSearchResult = await findBusiness.byUuid(business_uuid);
    if (businessSearchResult.status >= 400) {
      response = { ...businessSearchResult };
    } else {
      business = businessSearchResult.data;
      try {
        if (transactionType === "add") {
          let findBusiness = await user.addBusiness(business);
          response = jsonResponse(200, "", findBusiness);
        } else if (transactionType === "remove") {
          let linkResult = await user.removeBusiness(business);
          response = jsonResponse(200, "", findBusiness);
        }
      } catch (error) {
        response = jsonResponse(400, "", "", { error });
      }
    }
  }

  return response;
};

module.exports = { editUser, linkBusiness };
