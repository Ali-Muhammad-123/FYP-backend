const FeedbackReply = require("../models/feedbackreply");


class PostfeedbackReplyController {

    static async Execute(req, res) {


        const { feedback, reply } = req.body;


        if (feedback != undefined &&
            reply != undefined
        ) {

            const feedbackreplyObj = new FeedbackReply({
                feedback: feedback,
                reply: reply
            })

            await feedbackreplyObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `feedback reply saved`,
                    });
                }
            })

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }


    }
}




module.exports = PostfeedbackReplyController