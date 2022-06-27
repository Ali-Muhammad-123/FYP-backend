const mongoose = require("mongoose");

const shareCertificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },

},
  { timestamps: true });

module.exports = mongoose.model("shareCertificate", shareCertificateSchema);
