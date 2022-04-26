const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");

const dbConnect = require("./config/elephantSql/elephantConnect");

// Config imports
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env." + process.env.NODE_ENV)) {
  require("dotenv").config({ path: `${rootDir}/.env.${process.env.NODE_ENV}` });
}

const authApi = require("./v1/api/auth");
const usersApi = require("./v1/api/users");

const app = express();
app.use(express.json());

// Configurations
let corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

const dbase = dbConnect();

dbase
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error(err);
  });

// Routes;
app.use("/v1/auth", authApi);
app.use("/v1/users", usersApi);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.clear();
  console.log(`                        messageWerks`);
  console.log("-------------------------------------------------------------");
  console.log(`Listening to port:  ${PORT}`);
  console.log(`      Environment:  ${process.env.NODE_ENV}`);
  console.log(`        File name:  ${process.env.FILE_NAME}`);
  console.log("-------------------------------------------------------------");
  console.log();
  console.log("Press ctrl+C to quit");
  console.log();
});
