const mongoose = require("mongoose");

const shareCertificateSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  shareCertificate: {
    type: Buffer,
    required: true,
  },

});

module.exports = mongoose.model("shareCertificate", shareCertificateSchema);
