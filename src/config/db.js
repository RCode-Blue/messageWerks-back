const mongoose = require("mongoose");
const devConfig = require("./dev.config.json");
const prodConfig = require("./prod.config.json");

const mongoUri =
  devConfig.mongoUriPart1 +
  devConfig.mongoUserAccount +
  devConfig.mongoUriPart2 +
  devConfig.mongoUserPassword +
  devConfig.mongoUriPart3 +
  devConfig.mongoDBName +
  devConfig.mongoUriPart4;

const connectDB = async () => {
  console.log(mongoUri);
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (mongoose.connection.readyState) {
      console.log("MongoDB connected...");
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
