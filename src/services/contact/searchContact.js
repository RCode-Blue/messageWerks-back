const Contact = require("../../db/models/Contact");
const jsonResponse = require("../createJsonResponse");

const findContactById = async (id) => {
  return (await Contact.findById(id)) ? null : Contact.findById(id);
  // return result

  // let contact = await Contact.findById(id)

  // if(!contact){
  //   return null
  // }
  // return contact
};

module.exports = { findContactById };
