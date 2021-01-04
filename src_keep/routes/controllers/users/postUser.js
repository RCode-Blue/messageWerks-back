/**
 * @description Creates a new user
 *
 * @module postUser
 * @returns {object} res User object and token
 * @async
 *
 * @requires jsonwebtoken
 *
 * @requires User
 * @requires createUser
 * @borrows User
 * @borrows createUser
 *
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @throws {object} Error if submitted user details do not fulfill requirements
 * @throws {object} Error if user already exists
 * @throws {object} Error if there is a problem saving to database
 */
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../../../db/models/User");
const createUser = require("../../../services/users/createUser");
const jsonResponse = require("../../../services/createJsonResponse");

const appValues = require("../../../config/appValues.json");

const postUser = async (req, res) => {
  const { email } = req.body;
  const duration = appValues.session.sessionDuration;

  let response;

  // Check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = jsonResponse("_400", "Validation error", {
      errors: errors.array(),
    });
    return res.status(response.status).json(response);
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      response = jsonResponse("_409", "User already exists");
      return res.status(response.status).json(response);
    }

    // Create user
    user = await createUser(req, res);

    // Generate token
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Generate response
    response = jsonResponse("_200", "Success");

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: duration },
      (err, token) => {
        if (err) throw err;
        response.data = { user, token };
        res.status(response.status).json(response);
      }
    );
  } catch (err) {
    response = jsonResponse("_500", "Error", {
      source: "postUser",
      error: err,
    });
    res.status(response.status).json(response);
  }
};

module.exports = postUser;
