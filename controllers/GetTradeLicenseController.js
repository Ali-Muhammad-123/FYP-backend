const TradeLicense = require("../models/TradeLicense");
class PostTradeLicenseController {

    static async Execute(req, res) {

        const tradeLicense = await TradeLicense.find().populate({
            path: 'client',
            select:
                'firstName lastName',
        });

        if (tradeLicense && tradeLicense.length > 0) {
            res.status(200).send({
                message: "Successfull",
                tradeLicense: tradeLicense
            });
        } else {
            res.status(400).send({
                message: "No records found!"
            });
        }

    }

}



module.exports = PostTradeLicenseController;
