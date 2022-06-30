const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emirates_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emirates"
  }
},
  { timestamps: true });

module.exports = mongoose.model("activity", ActivitySchema);
