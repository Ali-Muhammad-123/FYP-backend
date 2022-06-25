const ExpressAccountingRequest = require("../models/expressAccountingRequest");

class PostExpressAccountingController {

    static async Execute(req, res) {

        const { user, requestType } = req.body;

        if (user != undefined &&
            requestType != undefined) {

            ImmigrationCard.findOneAndUpdate(
                { 'user': user },
                {
                    $set:
                    {
                        user: user,
                        requestType: requestType
                    }
                },
                { upsert: true },
                (err, response) => {
                    if (err) {
                        res.status(400).json({
                            message: `Error: ${err}`,
                        });
                    } else {
                        res.status(200).json({
                            message: `Express Accountng Updated.`,
                        });
                    }
                }
            );
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = PostExpressAccountingController;