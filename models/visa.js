const mongoose = require("mongoose");

const visaSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  visa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: "File",
    },
  ],
});

module.exports = mongoose.model("visa", visaSchema);
