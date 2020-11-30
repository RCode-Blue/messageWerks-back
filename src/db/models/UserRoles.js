const { Mongoose } = require("mongoose");

const UserRolesSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  business_roles: [
    {
      business: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "business",
      },
      business_roles: {
        type: [String],
      },
    },
  ],
  user_roles: {
    type: [String],
  },
  subscriber_status: {
    type: [String],
  },
});

module.exports = mongoose.model("userroles", UserRolesSchema);
