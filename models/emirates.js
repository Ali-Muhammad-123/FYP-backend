const mongoose = require("mongoose");

const EmiratesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
},
  { timestamps: true });

module.exports = mongoose.model("emirates", EmiratesSchema);
