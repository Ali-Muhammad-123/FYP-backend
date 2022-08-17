const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shareHolder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShareHolder",
        required: false,
      },
    ],
    name: {
      type: String,
      required: false,
    },
    licenseNo: {
      type: String,
      required: false,
    },
    licenseCode: {
      type: String,
      required: false,
    },
    judiciary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "emirates",
    },
    establishmentDate: {
      type: Date,
      required: false,
    },
    issueDate: {
      type: Date,
      required: false,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "activity",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", companySchema);
