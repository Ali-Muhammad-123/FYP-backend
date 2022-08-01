const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
},
    { timestamps: true });

module.exports = mongoose.model("contactRequest", contactSchema);
