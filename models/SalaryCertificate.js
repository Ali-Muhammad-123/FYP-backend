const mongoose = require("mongoose");

const SalaryCertificateSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  visa: {
    type: String,
    required: true,
  },
  salaryCertificate: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("salaryCertificate", SalaryCertificateSchema);
