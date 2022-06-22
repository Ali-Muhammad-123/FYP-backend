const mongoose = require("mongoose");

const SalaryCertificateSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
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
