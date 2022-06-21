const mongoose = require("mongoose");

const OfficeLeaseAgreementSchema = mongoose.Schema({
  Client_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
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
  }
});

module.exports = mongoose.model("officeLeaseAgreements", OfficeLeaseAgreementSchema);
