const mongoose = require("mongoose");

const Schema = mongoose.Schema({

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  message: {
    type: String,
    required: true,
  }

},
  { timestamps: true });

module.exports = mongoose.model("ArticlesOfIncorporation", Schema);
