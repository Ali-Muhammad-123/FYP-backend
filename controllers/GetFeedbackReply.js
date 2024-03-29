const FeedbackReply = require("../models/feedbackReply");

class GetFeedbackReplyController {

    static async Execute(req, res) {

        const { feedback } = req.query;

        if (feedback != undefined && feedback.match(/^[0-9a-fA-F]{24}$/)) {



            var feedbackReply = await FeedbackReply.find({

                feedback: feedback
            });

            if (feedbackReply && feedbackReply.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    feedbackReply: feedbackReply
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }


        } else {

            var feedbackReply = await FeedbackReply.find();

            if (feedbackReply && feedbackReply.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    feedbackReply: feedbackReply
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetFeedbackReplyController
