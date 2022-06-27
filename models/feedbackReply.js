const mongoose = require("mongoose");

const FeedbackReplySchema = mongoose.Schema({
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedback"
    },
    reply: {
        type: String,
        required: true,
    }
},
    { timestamps: true });

module.exports = mongoose.model("feedbackReply", FeedbackReplySchema);
