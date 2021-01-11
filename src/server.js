/**
 * @description Starting server file for project
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */

const express = require("express");
const fs = require("fs");
const path = require("path");

const contactsPath = require("./routes/api/contacts");
const usersPath = require("./routes/api/users");

const connectDB = require("./config/db");

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

// Routes
app.use("/api/contacts", contactsPath);
app.use("/api/users", usersPath);

// app.use("/api/auth", authPath);

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
