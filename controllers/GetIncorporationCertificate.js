const IncorporationCertificate = require("../models/IncorporationCertificate");

class GetIncorporationCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {



            var incorporationCertificate = await IncorporationCertificate.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (incorporationCertificate && incorporationCertificate.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    incorporationCertificate: incorporationCertificate
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }


        } else {

            var incorporationCertificate = await IncorporationCertificate.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (incorporationCertificate && incorporationCertificate.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    incorporationCertificate: incorporationCertificate
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetIncorporationCertificateController