/**
 * @description Starting server file for project
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */

const path = require("path");
const express = require("express");
const fs = require("fs");

const connectDB = require("./config/db");

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
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}...`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log("Press Ctrl+C to quit");
});
