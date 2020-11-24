const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  const mongoId = req.params.user_id;
  if (!mongoose.Types.ObjectId.isValid(mongoId)) {
    return res.status(400).json({ msg: "invalid ID" });
  }
  next();
};
