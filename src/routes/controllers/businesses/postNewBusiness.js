const mongoose = require("mongoose");

const Business = require("../../../db/models/Business");

const checkDups = require("../../../services/checkdups");
const checkMongoId = require("../../../services/checkMongoId");
const checkUserIds = require("../../../services/users/checkUserIds");

const checkUsersArray = require("../../../services/users/checkUsersArray");

const postNewBusiness = async (req, res) => {
  console.log(req.body);
  const { owners } = req.body;

  const validity = await checkUsersArray(owners);
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
