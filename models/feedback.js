const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  feedback: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
},
  { timestamps: true });

module.exports = mongoose.model("feedback", FeedbackSchema);
