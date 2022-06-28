const mongoose = require("mongoose");

const IncorporationCertificateSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
},
  { timestamps: true });

module.exports = mongoose.model("incorporationCertificate", IncorporationCertificateSchema);
