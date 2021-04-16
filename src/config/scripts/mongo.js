/**
 * @description db connection to MongoDB
 * @name connectDB
 * @requires mongoose
 * @exports {Object} connectDB
 */

require("dotenv").config();

const mongoose = require("mongoose");
const devConfig = require("../dev.config.json");
const prodConfig = require("../prod.config.json");

const mongoDBName = process.env.MONGO_DB_NAME;
const mongoUserAccount = process.env.MONGO_USER_ACCOUNT;
const mongoUserPassword = process.env.MONGO_USER_PASSWORD;

const mongoUri =
  devConfig.mongoUriPart1 +
  mongoUserAccount +
  devConfig.mongoUriPart2 +
  mongoUserPassword +
  devConfig.mongoUriPart3 +
  mongoDBName +
  devConfig.mongoUriPart4;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (mongoose.connection.readyState) {
      console.log("MongoDB connected ...");
    }
  } catch (err) {
    console.error("MongoDB error: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
