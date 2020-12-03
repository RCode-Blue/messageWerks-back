const Business = require("../../../db/models/Business");

const checkUsersArray = require("../../../services/users/checkUsersArray");
const checkAddressFields = require("../../../services/checkAddressFields");
const checkEmailField = require("../../../services/checkEmailField");
const objToDot = require("../../../services/objToDot");
const responseTemplates = require("../../../config/responseTemplates.json");
const { response } = require("express");

// const { result } = require("validate.js");

const putBusiness = async (req, res) => {
  console.log(req.body);
  // console.log(req.params.business_id);

  const id = req.params.business_id;
  let business = await Business.findById(id);
  // console.log(business);

  // Check owners list
  if (req.body.owners) {
    let result = await checkUsersArray(req.body.owners);

    if (result.status !== 200) {
      return res.status(result.status).json(result);
    }
  }

  // Check address fields
  if (req.body.address) {
    let result = checkAddressFields(req.body.address);
    if (result.status !== 200) {
      return res.status(result.status).json(result);
    }
  }

  // Check email
  if (req.body.contact) {
    let result = checkEmailField({ email: req.body.contact.email });
    if (result !== undefined) {
      return res.status(result.status).json(result);
    }
  }

  let newValues = objToDot(req.body);

  // Update
  try {
    resData = await business.updateOne({ $set: newValues }).exec();

    let response = responseTemplates._200;

    let updatedUser = await Business.findById(id).exec();
    response.message = "Success";
    response.data = { user: updatedUser, resData: resData };

    res.status(response.status).json(response);
  } catch {
    let response = responseTemplates._500;
    res.status(response.status).json({ message: "Server Error" });
  }
};

module.exports = putBusiness;
