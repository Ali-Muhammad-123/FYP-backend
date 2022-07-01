const ExpressAccountingRequest = require("../models/expressAccountingRequest");

class PostExpressAccountingController {

    static async Execute(req, res) {

        const { user, requestType } = req.body;

        if (user != undefined &&
            requestType != undefined) {

            const expressAccountingRequestObj = new ExpressAccountingRequest({
                user: user.trim(),
                requestType: requestType.trim(),
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