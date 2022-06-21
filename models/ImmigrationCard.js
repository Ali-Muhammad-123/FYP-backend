const mongoose = require("mongoose");

const IncorporationCertificateSchema = mongoose.Schema({
  Client_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  email: {
    type: String,
    required: true,
  },
  clientName: {
    type: mongoose.Schema.Types.String,
    ref: "Client"
  },
  dateOfIssue: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  immigrationCard: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("incorporationCertificate", IncorporationCertificateSchema);
