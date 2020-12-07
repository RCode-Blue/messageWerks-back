const EmailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("emailtemplate", EmailTemplateSchema);
