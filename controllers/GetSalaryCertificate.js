const SalaryCertificate = require("../models/SalaryCertificate");

class GetSalaryCertificateController {

    static async Execute(req, res) {

        const { user } = req.query;

        if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {

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
                res.status(200).json({
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
                res.status(200).json({
                    message: "No Record found",
                });
            }


        }


    }
}



module.exports = GetSalaryCertificateController;