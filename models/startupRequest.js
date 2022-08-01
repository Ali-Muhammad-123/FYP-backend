const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    required: true,
  }
},
  { timestamps: true });

module.exports = mongoose.model("StartupRequest", requestSchema);
