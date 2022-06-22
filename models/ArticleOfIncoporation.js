const mongoose = require("mongoose");

const Schema = mongoose.Schema({

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
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
