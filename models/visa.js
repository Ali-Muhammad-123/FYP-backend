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
  entryPermitIssued: {
    type: Boolean,
    required: true,
  },
  visaUID: {
    type: String,
    required: false,
  },
  residencyVisaIssued: {
    type: Boolean,
    required: true,
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
      required: false
    },
  ],
  entryPermit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: false
    },
  ],
  residencyVisa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: false
    },
  ],
  emiratesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: false
    },
  ],
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    require: false
  },
  familyMember: {
    type: Boolean,
    require: false
  },
});

module.exports = mongoose.model("visa", visaSchema);
