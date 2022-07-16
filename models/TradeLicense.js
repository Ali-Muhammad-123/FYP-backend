const mongoose = require("mongoose");

const TradeLicenseSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  licenseNo: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
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
  file: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  }],

},
  { timestamps: true }
);

module.exports = mongoose.model("tradeLicense", TradeLicenseSchema);
