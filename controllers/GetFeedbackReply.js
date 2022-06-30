const FeedbackReply = require("../models/feedbackReply");

class GetFeedbackReplyController {

    static async Execute(req, res) {

        const { feedback } = req.params;

        if (feedback != undefined) {



            var feedbackReply = await FeedbackReply.find({

                feedback: feedback
            });

            if (feedbackReply && feedbackReply.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    feedbackReply: feedbackReply
                });

            } else {
                res.status(403).json({
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
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetFeedbackReplyController
