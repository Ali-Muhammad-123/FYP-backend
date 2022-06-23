const mongoose = require("mongoose");

const Schema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: Buffer,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("ArticlesOfIncorporation", Schema);
