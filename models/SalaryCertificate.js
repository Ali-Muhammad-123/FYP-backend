const mongoose = require("mongoose");

const SalaryCertificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  visa: {
    type: String,
    required: true,
  },
  salaryCertificate: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("salaryCertificate", SalaryCertificateSchema);
