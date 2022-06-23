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
});

module.exports = mongoose.model("feedbackReply", FeedbackReplySchema);
