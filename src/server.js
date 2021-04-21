/**
 * @description Starting server file for project
 *
 * @name server
 * @requires express
 * @borrows {object} connectDB - DB connection to MongoDB
 */

const express = require("express");
const fs = require("fs");
const path = require("path");

const adminContactsPath = require("./routes/api/v1/admin/contacts");
const adminUsersPath = require("./routes/api/v1/admin/users");
// const authPath = require("./routes/api/auth");
// const businessesPath = require("./routes/api/businesses");
// const contactsPath = require("./routes/api/contacts");
// const emailBodiesPath = require("./routes/api/emailBodies");
// const mePath = require("./routes/api/me");
const publicPath = require("./routes/api/public");
// const subscribersPath = require("./routes/api/subscribers");
// const usersPath = require("./routes/api/users");

// const prototypePath = require("./routes/api/prototype");

const connectMongo = require("./config/scripts/mongo");
// const connectRedis = require("./config/scripts/redis");

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
// let redisClient = connectRedis();

// Init middleware
app.use(express.json());

// Routes
app.use("/api/v1/admin/contacts", adminContactsPath);
app.use("/api/v1/admin/users", adminUsersPath);
// app.use("/api/v1/admin/contacts", adminContactsPath);
// app.use("/api/v1/admin/contact", adminContactsPath);
// app.use("api/v1/public", publicPath);
// app.use("/api/auth", authPath); // User, Admin
// app.use("/api/businesses", businessesPath); // User, Admin
// app.use("/api/contacts", contactsPath); // Admin
// app.use("/api/emailbodies", emailBodiesPath); // User, Admin
// app.use("/api/subscribers", subscribersPath); // User, Admin, Email, Web
// app.use("/api/users", usersPath); // Admin, Email

// app.use("/api/me", mePath); // User

// app.use("/api/prototype", prototypePath); // Testing

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
