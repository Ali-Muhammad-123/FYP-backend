const mongoose = require("mongoose");

const shareCertificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  shareCertificate: {
    type: Buffer,
    required: true,
  },

});

module.exports = mongoose.model("shareCertificate", shareCertificateSchema);
