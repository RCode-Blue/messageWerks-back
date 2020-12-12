/**
 * @description Retrieves all users
 * @module getUsers
 * @async
 *
 * @requires User
 * @borrows User
 * @returns {object} users
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @throws {object} Error if no user found
 */
const User = require("../../../db/models/User");

const createJson = require("../../../services/createJsonResponse");

const getUsers = async (req, res) => {
  let response;
  try {
    const users = await User.find({});
    if (!users) {
      response = createJson("_400", { errors: "User(s) not found" });
      return res.status(response.status).json(response);
    }
    response = createJson("_200", "Success", { users });
    res.status(response.status).json(response);
  } catch (err) {
    console.error(err.message);
    response = createJson(_500, "Server error");
    return res.status(response.status).json(response);
  }
};

module.exports = getUsers;
