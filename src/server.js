/**
 * @description Starting server file for project
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */

const path = require("path");
const express = require("express");
const connectDB = require("./config/db");

const fs = require("fs");
const rootDir = path.dirname(__dirname);
// const envFile = path.join(rootDir + "./.env");
// console.log(envFile);
if (fs.existsSync(path.join(rootDir) + "/.env")) {
  require("dotenv").config();
}

// console.log(path.dirname(__dirname));

// require("dotenv").config({ path: __dirname + "/../.env" });

const app = express();

// console.log("---");
// console.log(process.env.JWT_SECRET);
// console.log("----");
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
app.use("/api/users", require("./api/routes/users/users"));

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}...`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log("Press Ctrl+C to quit");
});
