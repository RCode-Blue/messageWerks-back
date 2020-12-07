/**
 * @description Starting server file for project
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */

const acl = require("express-acl");
const express = require("express");
const fs = require("fs");
const path = require("path");

const authPath = require("./routes/api/auth");
const businessPath = require("./routes/api/businesses");
const profilesPath = require("./routes/api/profiles");
const usersPath = require("./routes/api/users");

const aclConfig = require("./config/acl.config.json");
const connectDB = require("./config/db");

global.__basedir = __dirname;

// Check if .env file exists
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env")) {
  require("dotenv").config();
} else {
  require("dotenv");
}

acl.config(aclConfig);

const app = express();

// DB connection
connectDB();

// Init middleware
app.use(express.json());
app.use(acl.authorize);

// app.get("/", (req, res) => res.send("API running"));

// #region
// const app = express(),
//   DIST_DIR = __dirname,
//   HTML_FILE = path.join(DIST_DIR, "index.html");

// app.use(express.static(DIST_DIR));

// app.get("*", (req, res) => {
//   res.sendFile(HTML_FILE);
// });
// #endregion

// Routes

app.use("/api/auth", authPath);
app.use("/api/businesses", businessPath);
app.use("/api/profiles", profilesPath);
app.use("/api/users", usersPath);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.clear();
  console.log("-------------------------------------------------------------");
  console.log(`Listening to port:  ${PORT}`);
  console.log(`      Environment:  ${process.env.NODE_ENV}`);
  console.log("-------------------------------------------------------------");
  console.log("Press Ctrl+C to quit");
  console.log();
});
