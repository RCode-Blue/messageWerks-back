/**
 * @description Verifies if a user ID is valid
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

module.exports = function (req, res, next) {
  const mongoId = req.params.user_id;
  if (!mongoose.Types.ObjectId.isValid(mongoId)) {
    return res.status(400).json({ msg: "invalid ID" });
  }
  next();
};
