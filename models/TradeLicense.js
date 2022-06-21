const mongoose = require("mongoose");

const TradeLicenseSchema = mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  licenseNo: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  judiciary: {
    type: String,
    required: true,
  },
  establishmentDate: {
    type: Date,
    required: true,
  },
  dateOfIssue: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tradeLicense", TradeLicenseSchema);
