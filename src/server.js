/**
 * @description Starting server file for project
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */

const express = require("express");
const fs = require("fs");
const path = require("path");

const jwtPath = require("./routes/api/jwt");
const businessesPath = require("./routes/api/businesses");
const contactsPath = require("./routes/api/contacts");
const emailBodiesPath = require("./routes/api/emailBodies");
const mePath = require("./routes/api/me");
const subscribersPath = require("./routes/api/subscribers");
const usersPath = require("./routes/api/users");

const connectMongo = require("./config/scripts/mongo");

global.__basedir = __dirname;

// Check if .env file exists
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env")) {
  require("dotenv").config();
} else {
  require("dotenv");
}

const app = express();

// DB connections
connectMongo();

// Init middleware
app.use(express.json());

// Routes
app.use("/api/auth", jwtPath);
app.use("/api/businesses", businessesPath);
app.use("/api/contacts", contactsPath);
app.use("/api/emailbodies", emailBodiesPath);
app.use("/api/me", mePath);
app.use("api/subscribers", subscribersPath);
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
