const mongoose = require("mongoose");

const visaSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  companyName: {
    type: String,
    required: true,
  },
  visaApplicant: {
    type: String,
    required: true,
  },
  visaUID: {
    type: Number,
    required: true,
  },
  visaType: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  dateOfIssue: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  visa: {
    type: Buffer,
    require: true,
  }

});

module.exports = mongoose.model("visa", visaSchema);