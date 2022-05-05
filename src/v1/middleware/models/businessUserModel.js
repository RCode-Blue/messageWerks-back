const appSettings = require("../../../config/appSettings.json");
const jsonResponse = require("../../../helpers/jsonResponse");

const checkTransactionType = (req, res, next) => {
  const { transactionType } = req.body;
  const allowedTransactions =
    appSettings.project.postgresql.associations.allowedTransactionTypes;

  let isAllowed = allowedTransactions.includes(transactionType);
  if (!isAllowed) {
    let response = jsonResponse(400, "Invalid transaction type");
    return res.status(response.status).json(response);
  }
};

module.exports = { checkTransactionType };
