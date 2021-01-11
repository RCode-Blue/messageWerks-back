// const mongoose = require("mongoose");

const Contact = require("../../db/models/Contact");
const User = require("../../db/models/User");

const jsonResponse = require("../../services/createJsonResponse");
const appValues = require("../../config/appValues.json");

const checkItem = (object) => {
  return async (id) => {
    try {
      let item = await object.findById(id);
      return item;
    } catch (err) {
      return null;
    }
  };
};

const checkIdExists = async (req, res, next) => {
  const { param_types } = appValues;
  let mongoModel;

  // if (req.params.contact_id) {
  const key = Object.keys(req.params)[0];
  const keyVal = req.params[key];
  const modelName = param_types[key];

  switch (modelName) {
    case "Contact":
      mongoModel = Contact;
      break;
    case "User":
      mongoModel = User;
      break;
  }

  const checkObj = checkItem(mongoModel);
  const itemExists = await checkObj(keyVal);

  if (!itemExists) {
    let response = jsonResponse("404", "Item not found");
    return res.status(response.status).json(response);
  }

  next();
  // }
};

module.exports = checkIdExists;
