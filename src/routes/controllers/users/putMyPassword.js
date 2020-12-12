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

const jsonTemplates = require("../../../config/responseTemplates.json");

const putMyPassword = async (req, res) => {
  let response;

  const { password1, password2 } = req.body;

  // Check if repeated passwords are same
  if (password1 !== password2) {
    response = jsonTemplates._400;
    response.message = "Passwords don't match";
    return res.status(response.status).json(response);
  }

  try {
    let user = await findUser.byUserId(req.user.id);
    const encryptedPassword = await encrypt(password1);

    user.password = encryptedPassword;
    await user.save();

    response = jsonTemplates._200;
    response.message = "Success";
    response.data = user;
    res.status(response.status).json(response);
  } catch (err) {
    console.error(err.message);
    response = jsonTemplates._500;
    response.message = "Server error";
    res.status(response.status).json(response);
  }
};

module.exports = putMyPassword;
