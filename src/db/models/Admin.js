const { Mongoose } = require("mongoose");

const AdminSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoode.model("admin", AdminSchema);
