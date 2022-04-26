/**
 * @description Express routes for User <br>
 * GET    /users/all:    Get all users <br>
 * GET    /users/id:     Get a user by ID <br>
 * POST   /users/create: Create a new user <br>
 * PATCH  /users/edit:   Edit user details <br>
 * DELETE /users/delete: Delete a user
 *
 * @module routes/users
 * @requires express
 */

const express = require("express");
const router = express.Router();

const deleteUser = require("../controllers/user/deleteUser");
const findUsers = require("../controllers/user/findUser");
const getAllUsers = require("../controllers/user/getAllUsers");
const patchUser = require("../controllers/user/patchUser");
const postUser = require("../controllers/user/postUser");

router.get("/all", async (req, res) => {
  let response = await getAllUsers();
  res.status(response.status).json(response);
});

router.get("/uuid", async (req, res) => {
  const uuid = req.body.uuid;
  let response = await findUsers.byUuid(uuid);
  res.status(response.status).json(response);
});

router.post("/create", async (req, res) => {
  const user = req.body;
  let response = await postUser(user);
  res.status(response.status).json(response);
});

router.patch("/edit", async (req, res) => {
  const userData = req.body;
  let response = await patchUser(userData);
  res.status(response.status).json(response);
});

router.delete("/remove", async (req, res) => {
  const userData = req.body;
  let response = await deleteUser(userData);
  res.status(response.status).json(response);
});

module.exports = router;
