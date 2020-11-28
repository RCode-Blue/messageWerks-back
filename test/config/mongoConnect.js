const mongoose = require("mongoose");

const mongoConfig = async () => {
  await mongoose.connectiion(
    global.__MONGO_URI__,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
};

module.exports = mongoConfig;
