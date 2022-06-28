const TradeLicense = require("../models/TradeLicense");
class GetTradeLicenseController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {


            const tradeLicense = await TradeLicense.find({
                _id: _id
            }).populate({
                path: 'company',
            });

            if (tradeLicense && tradeLicense.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    tradeLicense: tradeLicense,
                });
            } else {
                res.status(403).send({
                    message: "No records found!"
                });
            }

        } else {
            const tradeLicense = await TradeLicense.find().populate({
                path: 'company',
            });

            if (tradeLicense && tradeLicense.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    tradeLicense: tradeLicense,
                    createdAt: tradeLicense.createdAt,
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
