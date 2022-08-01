const Request = require("../models/startupRequest");

class GetRequestController {

    static async Execute(req, res) {

        const { user } = req.query;

        if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {



            var request = await Request.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (request && request.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    request: request
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var request = await Request.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (request && request.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    request: request
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetRequestController