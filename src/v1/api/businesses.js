const express = require("express");
const router = express.Router();

const deleteBusiness = require("../controllers/business/deleteBusiness");
const findBusiness = require("../controllers/business/findBusiness");
const getAllBusinesses = require("../controllers/business/getAllBusinesses");
const patchBusiness = require("../controllers/business/patchBusiness");
const postBusiness = require("../controllers/business/postBusiness");

const businessUserModel = require("../middleware/models/businessUserModel");

router.get("/all", async (req, res) => {
  let response = await getAllBusinesses();
  res.status(response.status).json(response);
});

router.get("/uuid", async (req, res) => {
  const { uuid } = req.body;
  let response = await findBusiness.byUuid(uuid);
  res.status(response.status).json(response);
});

router.post("/new", async (req, res) => {
  const business = req.body;
  let response = await postBusiness(business);
  res.status(response.status).json(response);
});

router.patch("/edit", async (req, res) => {
  const businessData = req.body;
  let response = await patchBusiness.editBusiness(businessData);
  res.status(response.status).json(response);
});

router.patch(
  "/link",
  businessUserModel.checkTransactionType,
  async (req, res) => {
    const linkData = req.body;
    let response = await patchBusiness.linkUser(linkData);
    res.status(response.status).json(response);
  }
);

router.delete("/remove", async (req, res) => {
  const businessData = req.body;
  let response = await deleteBusiness(businessData);
  res.status(response.status).json(response);
});

module.exports = router;