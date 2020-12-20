/**
 * @description Change user password
 *
 * @module putMyPassword
 * @async
 *
 * @requires findUser
 * @requires encrypt
 * @borrows findUser
 * @borrows findUser
 *
 * @returns {object} res User object and token
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @throws {object} Error if passwords don't match
 * @throws {object} Error if error saving changes to the server
 */
// const User = require("../../../db/models/User");

const findUser = require("../../../services/users/findUser");
const encrypt = require("../../../services/encrypt");
const changePassword = require("../../../services/users/changePassword");

// const jsonTemplates = require("../../../config/responseTemplates.json");
const jsonResponse = require("../../../services/createJsonResponse");

const putMyPassword = async (req, res) => {
  let response;

  const { password1, password2 } = req.body;

  // Check if repeated passwords are same
  if (password1 !== password2) {
    response = jsonResponse("_400", "Passwords don't match");
    return res.status(response.status).json(response);
  }

  try {
    let user = changePassword(req.user.id, password1);
    response = jsonResponse("_200", "Success", user);
    res.status(response.status).json(response);
  } catch (err) {
    console.error(err.message);

    response = jsonResponse("_500", "Server error", err);
    res.status(response.status).json(response);
  }
};

module.exports = putMyPassword;
