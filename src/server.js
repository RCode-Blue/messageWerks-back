const path = require("path");
const fs = require("fs");

const express = require("express");

const testPath = require("./api/test");

// Check if .env.<environment> file exists
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env." + process.env.NODE_ENV)) {
  require("dotenv").config();
}

// console.log("NODE_ENV: ", process.env.NODE_ENV);

// const app = express(),
//   DIST_DIR = __dirname,
//   HTML_FILE = path.join(DIST_DIR, "index.html");
//
// app.use(express.static(DIST_DIR));

const app = express();

app.use(express.json());

// app.get("*", (req, res) => {
//   res.sendFile(HTML_FILE);
// });

// Routes
app.use("/test", testPath);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.clear();
  console.log("-------------------------------------------------------------");
  console.log(`Listening to port:  ${PORT}`);
  console.log(`      Environment:  ${process.env.NODE_ENV}`);
  console.log("-------------------------------------------------------------");
  console.log("Press ctrl+C to quit");
  console.log();
});
