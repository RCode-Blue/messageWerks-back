const cors = require("cors");
// const { createCipheriv } = require("crypto");
const express = require("express");
const fs = require("fs");
const path = require("path");

const elephantConnect = require("./config/elephantSql/elephantConnect");

// Config imports
const rootDir = path.dirname(__dirname);

if (
  process.env.NODE_ENV &&
  fs.existsSync(path.join(rootDir) + "/.env" + process.env.NODE_ENV)
) {
  require("dotenv").config({ path: `${rootDir}/.env${process.env.NODE_ENV}` });
} else {
  require("dotenv").config();
}

const authApi = require("./v1/api/auth");
const businessApi = require("./v1/api/business");
const usersApi = require("./v1/api/users");
const testApi = require("./v1/api/test");

const app = express();
app.use(express.json());

// Configuration - CORS
let corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

// Configuration - Sequelize
const sequelize = elephantConnect();
sequelize
  .authenticate()
  .then(() => console.log("Sequelize connection successful"))
  .catch((err) => {
    console.error("Sequelize connection error: ", err);
  });

// Routes;
app.use("/v1/auth", authApi);
app.use("/v1/business", businessApi);
app.use("/v1/users", usersApi);
app.use("/v1/test", testApi);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.clear();
  console.log(`                     messageWerks-Back`);
  console.log("-------------------------------------------------------------");
  console.log(`Listening to port:  ${PORT}`);
  console.log(`      Environment:  ${process.env.NODE_ENV}`);
  console.log(`    env File name:  ${process.env.FILE_NAME}`);
  console.log(`  Database server:  ${process.env.ELEPHANTSQL_HOST}`);
  console.log(`      DB Password:  ${process.env.ELEPHANTSQL_PASSWORD}`);
  console.log(`        DB UserId:  ${process.env.ELEPHANTSQL_USERID}`);
  console.log("-------------------------------------------------------------");
  console.log();
  console.log("Press ctrl+C to quit");
  console.log();
});
