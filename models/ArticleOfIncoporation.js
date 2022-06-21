const mongoose = require("mongoose");

const Schema = mongoose.Schema({

  _Client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
      },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  article: {
    type : Buffer,
    required: true,
  },
  message: {
    type : String,
    required: true,
  }
  
});

module.exports = mongoose.model("ArticlesOfIncorporation", Schema);
