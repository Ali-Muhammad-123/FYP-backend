const mongoose = require("mongoose");

const IncorporationCertificateSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  incorporationCertificate: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("incorporationCertificate", IncorporationCertificateSchema);
