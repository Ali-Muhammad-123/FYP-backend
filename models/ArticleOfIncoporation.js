const mongoose = require("mongoose");

const Schema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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

});

module.exports = mongoose.model("ArticlesOfIncorporation", Schema);
