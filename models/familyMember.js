const mongoose = require("mongoose");

const FamilySchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
});

module.exports = mongoose.model("familyMember", FamilySchema);
