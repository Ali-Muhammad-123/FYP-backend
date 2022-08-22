const mongoose = require("mongoose");

const EstablishmentCardSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    dateOfIssue: {
      type: Date,
      required: true,
    },
    establishmentDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    establishmentCardNo: {
      type: String,
      required: true,
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

module.exports = mongoose.model("establishmentCard", EstablishmentCardSchema);
