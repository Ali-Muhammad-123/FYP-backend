const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  Client_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  clientName: {
    type: mongoose.Schema.Types.String,
    ref: "Client"
  },
  requestType: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("officeLeaseAgreements", OfficeLeaseAgreementSchema);
