const mongoose = require("mongoose");

const visaSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  passportNo: {
    type: String,
    required: true,
  },
  passportIssue: {
    type: Date,
    required: true,
  },
  passportExpiry: {
    type: Date,
    required: true,
  },
  passportCountry: {
    type: String,
    required: true,
  },
  passport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  entryPermitIssued: {
    type: Boolean,
    required: true,
  },
  entryPermit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: false,
  },
  visaUID: {
    type: String,
    required: false,
  },
  residencyVisaIssued: {
    type: Boolean,
    required: true,
  },
  residencyVisa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: false,
  },
  emiratesIdIssued: {
    type: String,
    required: true,
  },
  emiratesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: false,
  },
  passport: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

module.exports = mongoose.model("visa", visaSchema);
