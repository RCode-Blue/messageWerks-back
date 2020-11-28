/**
 * @description Starting server file for project
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */
const express = require("express");
const fs = require("fs");
const path = require("path");

const adminsPath = require("./routes/api/admins");
const authPath = require("./routes/api/auth");
const profilesPath = require("./routes/api/profiles");
const usersPath = require("./routes/api/users");

const connectDB = require("./config/db");
const { clearScreenDown } = require("readline");

global.__basedir = __dirname;

// Check if .env file exists
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env")) {
  require("dotenv").config();
} else {
  require("dotenv");
}

const app = express();

// DB connection
connectDB();

// Init middleware
app.use(express.json());
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
app.use("/api/users", usersPath);
app.use("/api/profiles", profilesPath);
app.use("/api/auth", authPath);
app.use("/api/admins", adminsPath);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  // console.log("\033[2J");
  console.log("-------------------------------------------------------------");
  console.log(`App listening to port:  ${PORT}...`);
  console.log(`          Environment: * ${process.env.NODE_ENV} *`);
  console.log("-------------------------------------------------------------");
  console.log("Press Ctrl+C to quit");
  console.log();
});
