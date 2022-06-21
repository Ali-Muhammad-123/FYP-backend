const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  firstname:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  lastname:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("feedback", FeedbackSchema);
