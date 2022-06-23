const mongoose = require("mongoose");

const ImmigrationCardSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dateOfIssue: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  immigrationCard: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model("immigrationCard", ImmigrationCardSchema);
