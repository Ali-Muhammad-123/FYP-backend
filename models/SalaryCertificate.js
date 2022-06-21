const mongoose = require("mongoose");

const SalaryCertificateSchema = mongoose.Schema({
  Client_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  clientName: {
    type: mongoose.Schema.Types.String,
    ref: "Client"
  },
  Visa: {
    type: String,
    required: true,
  },
  certificate: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("officeLeaseAgreements", OfficeLeaseAgreementSchema);
