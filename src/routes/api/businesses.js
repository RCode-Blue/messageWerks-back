const express = require("express");
const router = express.Router();

const checkMongoId = require("../../routes/middleware/checkMongoId");

const getAllBusinesses = require("../../routes/controllers/businesses/getAllBusinesses");
const postNewBusiness = require("../controllers/businesses/postNewBusiness");

router.get("/all", async (req, res) => {
  getAllBusinesses(req, res);
  // res.send("GET: all businesses");
});

router.get("/id/:business_id", async (req, res) => {
  res.send("GET: business by id");
});

router.get("/search", async (req, res) => {
  res.send("GET: business by search criteria");
});

router.post("/new", async (req, res) => {
  // res.send("POST: new  business");
  postNewBusiness(req, res);
});

router.put("/edit/:business_id", async (req, res) => {
  res.send("PUT: edit existing business");
});

router.delete("/delete", async (req, res) => {
  res.send("DELETE: delete existing business");
});

module.exports = router;
