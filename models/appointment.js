const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
