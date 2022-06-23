const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },


    file: {
        type: mongoose.Schema.Types.ObjectId,
        required: "File",
    },

    description: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("appointment", Schema);
