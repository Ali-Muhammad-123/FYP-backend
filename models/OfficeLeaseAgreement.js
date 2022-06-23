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
  file: {
    type: mongoose.Schema.Types.ObjectId,
    required: "File",
  },
});

module.exports = mongoose.model("officeLeaseAgreements", OfficeLeaseAgreementSchema);
