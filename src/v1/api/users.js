/**
 * @description Express routes for User <br>
 * Endpoints:<br>
 * GET    /users/all - Get all users <br>
 * GET    /users/profile - Get a user by UUID <br>
 * POST   /users/new - Create a new user <br>
 * PATCH  /users/edit - Edit user details <br>
 * PATCH  /users/link - Create or remove a link between a user and a business
 * DELETE /users/delete - Delete a user
 *
 * @module
 * @name routes/users
 * @requires express
 */

const express = require("express");
const router = express.Router();

const deleteUser = require("../controllers/user/deleteUser");
const findUser = require("../controllers/user/findUser");
const getAllUsers = require("../controllers/user/getAllUsers");
const patchUser = require("../controllers/user/patchUser");
const postUser = require("../controllers/user/postUser");
const tokenUtils = require("../../helpers/auth/tokenUtils");
const verifyJwtToken = require("../middleware/auth/verifyJwtToken");
const verifyIsAdmin = require("../middleware/auth/verifyIsAdmin");

const businessUserModel = require("../middleware/models/businessUserModelUtils");

router.get("/all", verifyJwtToken, verifyIsAdmin, async (req, res) => {
  // expect req.body: {queryType: "nameOnly" or null}
  // console.log("------------");
  // console.log(req.headers);
  let response = await getAllUsers(req.headers.querytype);
  res.status(response.status).json(response);
});

router.get("/profile", verifyJwtToken, async (req, res) => {
  const token = req.headers.authorization;
  let verified = tokenUtils.verifyToken(token);

  const { uuid } = verified.data;
  let response = await findUser.byUuid(uuid);
  res.status(response.status).json(response);
});

router.get("/uuid", verifyJwtToken, async (req, res) => {
  // console.log("-----------------");
  // console.log(req.headers.uuid);
  const { uuid } = req.headers;
  let response = await findUser.byUuid(uuid);
  res.status(response.status).json(response);
});

router.post("/new", async (req, res) => {
  const user = req.body;
  let response = await postUser(user);
  res.status(response.status).json(response);
});

router.patch("/edit", async (req, res) => {
  const userData = req.body;

  // console.log("------- req body -------");
  // console.log(req.body);

  let response = await patchUser.editUser(userData);
  res.status(response.status).json(response);
});

router.patch(
  "/link",
  businessUserModel.checkTransactionType,
  async (req, res) => {
    const linkData = req.body;
    let response = await patchUser.linkBusiness(linkData);
    res.status(response.status).json(response);
  }
);

router.delete("/remove", async (req, res) => {
  const userData = req.body;
  let response = await deleteUser(userData);
  res.status(response.status).json(response);
});

module.exports = router;
