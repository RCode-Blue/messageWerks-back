const mongoose = require("mongoose");

const checkMongoId = (mongoId) => {
  (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[mongoId])) {
      return res.status(400).json({ msg: "invalid ID" });
    }
    next();
  };
};

module.exports = checkMongoId;
