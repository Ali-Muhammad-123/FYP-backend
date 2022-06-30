const ExpressAccountingRequest = require("../models/expressAccountingRequest");

class GetExpressAccountingRequestController {

    static async Execute(req, res) {

        const { user } = req.params;

        if (user != undefined) {



            var expressAccountingRequest = await ExpressAccountingRequest.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (expressAccountingRequest && expressAccountingRequest.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    expressAccountingRequest: expressAccountingRequest
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var expressAccountingRequest = await ExpressAccountingRequest.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (expressAccountingRequest && expressAccountingRequest.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    expressAccountingRequest: expressAccountingRequest
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetExpressAccountingRequestController