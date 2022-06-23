const mongoose = require("mongoose");

const IncorporationCertificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    required: "File",
  },
});

module.exports = mongoose.model("incorporationCertificate", IncorporationCertificateSchema);
