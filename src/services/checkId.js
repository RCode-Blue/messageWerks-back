const mongoose = require("mongoose");

const Contact = require("../db/models/Contact");
const User = require("../db/models/User");
const Business = require("../db/models/Business");

const appValues = require("../config/appValues.json");

// Checks if a given mongo id is valid
// returns true or false
const checkMongoValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Checks if a given Mongo ID exists
// returns true/false
const checkIdExists = async (data) => {
  const { param_types } = appValues;
  const id = Object.values(data)[0];
  const model_type = Object.keys(data)[0];
  const modelName = param_types[model_type];
  let model;

  switch (modelName) {
    case "Contact":
      model = Contact;
      break;
    case "User":
      model = User;
      break;
    case "Business":
      model = Business;
      break;
  }

  return model.exists({ _id: id });
};

module.exports = { checkMongoValid, checkIdExists };
