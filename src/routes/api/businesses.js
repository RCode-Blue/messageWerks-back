const express = require("express");
const router = express.Router();

const getBusinesses = require("../controllers/businesses/getBusinesses");
const postBusiness = require("../controllers/businesses/postBusiness");
const getBusinessById = require("../controllers/businesses/getBusinessById");
const patchBusiness = require("../controllers/businesses/patchBusiness");

// Get all businesses
router.get("/", async (req, res) => {
  await getBusinesses(req, res);
});

// Get a business
router.get("/:business_id", async (req, res) => {
  await getBusinessById(req, res);
});

// Search businesses
router.get("/find", async (req, res) => {
  res.send("Get a business");
});

// Create new business
router.post("/create", async (req, res) => {
  postBusiness(req, res);
});

// PATCH a business
router.patch("/:business_id", async (req, res) => {
  await patchBusiness(req, res);
});

// Delete a business
router.delete("/:business_id", async (req, res) => {
  res.send("Delete a business");
});

module.exports = router;
