const path = require("path");
const express = require("express");
const connectDB = require("./config/db");

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
app.use("/api/users", require("./api/routes/users/users"));

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}...`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log("Press Ctrl+C to quit");
});
