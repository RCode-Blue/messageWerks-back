const express = require("express");
const router = express.Router();

// const checkMongoId = require("../../routes/middleware/checkMongoId");

const deleteBusiness = require("../controllers/businesses/deleteBusiness");
const getAllBusinesses = require("../controllers/businesses/getAllBusinesses");
const getBusinessById = require("../controllers/businesses/getById");
const postNewBusiness = require("../controllers/businesses/postNewBusiness");
const putBusiness = require("../controllers/businesses/putBusiness");

router.get("/all", async (req, res) => {
  await getAllBusinesses(req, res);
});

router.get("/id/:business_id", async (req, res) => {
  await getBusinessById(req, res);
});

router.get("/search", async (req, res) => {
  res.send("GET: business by search criteria");
});

router.post("/new", async (req, res) => {
  await postNewBusiness(req, res);
});

router.put("/edit/:business_id", async (req, res) => {
  await putBusiness(req, res);
});

router.delete("/delete", async (req, res) => {
  await deleteBusiness(req, res);
});

module.exports = router;
