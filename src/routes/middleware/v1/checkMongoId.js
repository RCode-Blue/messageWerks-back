/**
 * @description Verifies if an ID is valid
 *
 * @module
 * @name checkMongoId
 *
 * @requires mongoose
 * @requires jsonResponse
 *
 * @param {object} req - Express request object: User ID
 * @param {object} res - Express response object
 * @param {function} next Next Express middleware
 * @param {function} next - Express next middleware function
 * @returns {object} response - Refer Type Definitions
 */

const mongoose = require("mongoose");
const jsonResponse = require("../../../services/v1/createJsonResponse");

const checkMongoId = (req, res, next) => {
  let response;

  const key = Object.keys(req.params)[0];
  const mongoId = req.params[key];

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(mongoId)) {
    response = jsonResponse("400", "Invalid ID");
    return res.status(response.status).json(response);
  }
  next();
};

module.exports = checkMongoId;
