const Feedback = require("../models/feedback");


class PostfeedbackController {

    static async Execute(req, res) {

        feedback: {
            const { user, feedback, status } = req.body;


            if (user != undefined &&
                feedback != undefined &&
                status != undefined
            ) {

                const feedbackObj = new Feedback({
                    user: user,
                    feedback: feedback,
                    status: status,
                })

                await feedbackObj.save((err) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    else {
                        res.status(200).json({
                            message: `feedback saved`,
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

}


module.exports = PostfeedbackController