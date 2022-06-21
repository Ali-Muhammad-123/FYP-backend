const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
    _Client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  certificate: {
    type: Buffer,
    required: true,
  },
  
});

module.exports = mongoose.model("certificate", certificateSchema);
