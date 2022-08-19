const mongoose = require("mongoose");

const shareCertificateSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    file: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("shareCertificate", shareCertificateSchema);
