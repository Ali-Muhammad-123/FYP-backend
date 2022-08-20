const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    email: [{
        type: String,
        required: true,
    }],

    phoneNumber: [{
        type: String,
        required: true,
    }],

    address: [{
        type: String,
        required: true,
    }],
},
    { timestamps: true });

module.exports = mongoose.model("contact", Schema);
