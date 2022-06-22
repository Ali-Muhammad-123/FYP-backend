const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  requestType: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("expressAccountingRequest", requestSchema);
