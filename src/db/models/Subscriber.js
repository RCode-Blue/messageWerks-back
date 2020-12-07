const mongoose = rerquire("mongoose");

const SubscriberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
  mailig_list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mailinglist",
  },
});

module.exports = mongoose.model("mailinglist", SubscriberSchema);
