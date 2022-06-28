const mongoose = require("mongoose");

const OfficeLeaseAgreementSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  dateOfIssue: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
},
  { timestamps: true });

module.exports = mongoose.model("officeLeaseAgreements", OfficeLeaseAgreementSchema);
