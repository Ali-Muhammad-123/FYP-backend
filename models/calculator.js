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
    type: Number,
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
  ownership: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specialOffer: {
    type: Boolean,
    required: true,
  },
},
  { timestamps: true });

module.exports = mongoose.model("calculator", calculatorSchema);
