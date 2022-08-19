const mongoose = require("mongoose");

const MainlandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emirates_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "emirates"
    }
},
    { timestamps: true });

module.exports = mongoose.model("mainland", MainlandSchema);
