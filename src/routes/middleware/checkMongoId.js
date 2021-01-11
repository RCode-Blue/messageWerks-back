/**
 * @description Verifies if an ID is valid
 * @module checkMongoId
 * @requires mongoose
 * @function
 * @param {Object} req - Express request object: User ID
 * @param {Object} res - Express response object
 * @param {Function} next Next Express middleware
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */

const mongoose = require("mongoose");
const jsonResponse = require("../../services/createJsonResponse");

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
