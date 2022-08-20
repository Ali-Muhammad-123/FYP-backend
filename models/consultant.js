const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    picture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true,
    },

    language: [{
        type: String,
        required: true,
    }]

},
    { timestamps: true });

module.exports = mongoose.model("consultant", Schema);
