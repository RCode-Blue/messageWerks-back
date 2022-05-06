/**
 * @description Middleware for model transactions
 *
 * @module businessUserModel
 *
 */

const appSettings = require("../../../config/appSettings.json");
const jsonResponse = require("../../../helpers/jsonResponse");

/**
 * @description Checks User - Business link transaction type <br>
 * Verifies if transactionType is one af a set of predefined strings
 *
 * @function checkTransactionType
 * @returns Error 400 if not, allows request to proceed if it is
 */
const checkTransactionType = (req, res, next) => {
  const { transactionType } = req.body;
  const allowedTransactions =
    appSettings.project.postgresql.associations.allowedTransactionTypes;

  let isAllowed = allowedTransactions.includes(transactionType);
  if (!isAllowed) {
    let response = jsonResponse(400, "Invalid transaction type");
    return res.status(response.status).json(response);
  }
  next();
};

module.exports = { checkTransactionType };
