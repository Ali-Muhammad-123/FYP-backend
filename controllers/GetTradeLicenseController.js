const TradeLicense = require("../models/TradeLicense");
class GetTradeLicenseController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {


            const tradeLicense = await TradeLicense.find({
                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (tradeLicense && tradeLicense.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    tradeLicense: tradeLicense
                });
            } else {
                res.status(403).send({
                    message: "No records found!"
                });
            }

        } else {
            const tradeLicense = await TradeLicense.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (tradeLicense && tradeLicense.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    tradeLicense: tradeLicense
                });
            } else {
                res.status(403).send({
                    message: "No records found!"
                });
            }
        }

    }

}



module.exports = GetTradeLicenseController;
