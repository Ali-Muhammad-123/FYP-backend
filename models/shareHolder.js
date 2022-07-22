const mongoose = require("mongoose");

const shareHolderSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("ShareHolder", shareHolderSchema);
