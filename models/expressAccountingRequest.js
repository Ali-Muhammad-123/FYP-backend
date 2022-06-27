const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  requestType: {
    type: String,
    required: true,
  }
},
  { timestamps: true });

module.exports = mongoose.model("expressAccountingRequest", requestSchema);
