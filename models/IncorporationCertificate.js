const mongoose = require("mongoose");

const IncorporationCertificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  incorporationCertificate: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("incorporationCertificate", IncorporationCertificateSchema);
