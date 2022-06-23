const mongoose = require("mongoose");

const calculatorSchema = mongoose.Schema({

  calculatorActivity: {
    type: String,
    required: true,
  },
  emirates: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  noOfShareholders: {
    type: Number,
    required: true,
  },
  visaAllocation: {
    type: String,
    required: true,
  },
  freeZoneType: {
    type: String,
    required: true,
  },
  freeZone: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("calculator", calculatorSchema);
