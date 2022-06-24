const SalaryCertificate = require("../models/SalaryCertificate");

class GetSalaryCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {

            var salaryCertificate = await SalaryCertificate.find({
                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (salaryCertificate && salaryCertificate.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    salaryCertificate: salaryCertificate
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }

        } else {


            var salaryCertificate = await SalaryCertificate.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (salaryCertificate && salaryCertificate.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    salaryCertificate: salaryCertificate
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }


        }


    }
}



module.exports = GetSalaryCertificateController;