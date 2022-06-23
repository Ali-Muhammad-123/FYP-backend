const mongoose = require("mongoose");

const OfficeLeaseAgreementSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
