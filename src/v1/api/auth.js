/**
 * @description Express routes for Authentication <br>
 * Endpoints: <br>
 * GET /login - Authenticates user id and password
 *
 * @module
 * @name routes/auth
 * @requires express
 */

const express = require("express");
const router = express.Router();

const loginUser = require("../controllers/auth/loginUser");

router.post("/login", async (req, res) => {
  const data = req.body;
  let response = await loginUser(data);
  res.set("Access-Control-Allow-Origin", "*");
  res.status(response.status).json(response);
});

module.exports = router;
