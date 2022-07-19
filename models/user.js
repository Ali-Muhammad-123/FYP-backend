const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
    unique: true
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
  passportDetails: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("User", UserSchema);
