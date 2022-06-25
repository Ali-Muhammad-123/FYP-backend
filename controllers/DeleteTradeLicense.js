const TradeLicense = require("../models/TradeLicense");
class DeleteTradeLicenseController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {

            const result = TradeLicense.findOneAndDelete({ "user": user }, function (err, response) {
                if (!err) {
                    if (response && response != null) {
                        res.status(200).json({
                            message: `Sucessfully deleted `,
                            result: response
                        });
                    } else {
                        res.status(403).json({
                            message: `No record found`,
                        });
                    }

                }
                else {

                    res.status(400).json({
                        message: `Error : ${err}`,
                    });
                }
            });

        } else {

            res.status(400).json({
                message: `Invalid Request`,
            });

        }

    }

}



module.exports = DeleteTradeLicenseController;
