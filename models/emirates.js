const mongoose = require("mongoose");

const EmiratesSchema = mongoose.Schema({
  id: {
    type: number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("emirates", EmiratesSchema);
