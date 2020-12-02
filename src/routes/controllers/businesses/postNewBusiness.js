const mongoose = require("mongoose");

const Business = require("../../../db/models/Business");

const checkDups = require("../../../services/checkdups");
const checkMongoId = require("../../../services/checkMongoId");
const checkUserIds = require("../../../services/users/checkUserIds");

const newBusinessOwnersChecks = require("../../../services/businesses/newBusinessOwnersChecks");

const postNewBusiness = async (req, res) => {
  const { owners } = req.body;

  const validity = await newBusinessOwnersChecks(owners);
  console.log(validity);

  if (validity.status === 200) {
    try {
      let newBusiness = new Business(req.body);
      newBusiness.save();
      return res.json(newBusiness);
    } catch (err) {
      console.error(err.message);
      const message = {
        status_name: "Server Error",
        message: err.message,
      };
      return res.status(500).json(message);
    }
  }

  // res.json(newBusiness);
  res.status(validity.status).json(validity);
};

module.exports = postNewBusiness;
