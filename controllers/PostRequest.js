const Request = require("../models/request");

class PostRequestController {

    static async Execute(req, res) {

        const { user, requestType } = req.body;

        if (user != undefined &&
            requestType != undefined) {

            const request = new Request({
                user: user.trim(),
                requestType: requestType.trim(),
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