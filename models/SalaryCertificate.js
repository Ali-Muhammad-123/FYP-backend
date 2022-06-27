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
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
},
  { timestamps: true });

module.exports = mongoose.model("salaryCertificate", SalaryCertificateSchema);
