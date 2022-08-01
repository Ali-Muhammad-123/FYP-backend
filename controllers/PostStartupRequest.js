const Request = require("../models/startupRequest");

class PostRequestController {

    static async Execute(req, res) {

        const { name,
            email,
            phoneNumber,
            address,
            comments,
            requestStatus } = req.body;

        if (name != undefined &&
            email != undefined &&
            phoneNumber != undefined &&
            address != undefined &&
            comments != undefined &&
            requestStatus != undefined) {

            const request = new Request({
                name: name,
                email: name,
                phoneNumber: name,
                address: name,
                comments: name,
                requestStatus: requestStatus,
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