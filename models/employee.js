const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
});

module.exports = mongoose.model("employee", EmployeeSchema);
