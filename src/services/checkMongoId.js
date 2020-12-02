const mongoose = require("mongoose");

const checkMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) ? true : false;
};

module.exports = checkMongoId;
