const Request = require("../models/contactRequest");

class PostRequestController {

    static async Execute(req, res) {

        const { user, subject, message } = req.body;

        if (
            subject != undefined &&
            message != undefined) {

            const request = new Request({
                user: user,
                subject: subject,
                message: message,
            })

            await request.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Request saved`,
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



module.exports = PostRequestController;