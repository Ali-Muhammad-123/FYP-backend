const mongoose = require("mongoose");

const OfficeLeaseAgreementSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
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
  leaseAgreement: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("officeLeaseAgreements", OfficeLeaseAgreementSchema);
