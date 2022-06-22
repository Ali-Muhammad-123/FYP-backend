const ImmigrationCard = require("../models/ImmigrationCard");
const ExpressAccountingRequest = require("../models/expressAccountingRequest");

class PostExpressAccountingController {

    static async Execute(req, res) {

        const { client, requestType } = req.body;

        if (client != undefined &&
            requestType != undefined) {

            const expressAccountingRequestObj = new ExpressAccountingRequest({
                client: client,
                requestType: requestType
            })

            await expressAccountingRequestObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Express Accounting Request saved`,
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



module.exports = PostExpressAccountingController;