const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mainland_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mainland"
  }
},
  { timestamps: true });

module.exports = mongoose.model("activity", ActivitySchema);
