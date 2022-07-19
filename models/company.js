const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shareHolder: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShareHolder",
      required: false,
    }],
    name: {
      type: String,
      required: true,
    },
    licenseNo: {
      type: String,
      required: true,
    },
    licenseCode: {
      type: String,
      required: false,
    },
    judiciary: {
      type: String,
      required: true,
    },
    establishmentDate: {
      type: Date,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "activity",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", companySchema);
