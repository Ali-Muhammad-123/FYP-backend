const ImmigrationCard = require("../models/ImmigrationCard");

class GetIncorporationCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {



            var immigrationCard = await ImmigrationCard.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (immigrationCard && immigrationCard.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    immigrationCard: immigrationCard
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var immigrationCard = await ImmigrationCard.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (immigrationCard && immigrationCard.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    immigrationCard: immigrationCard
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetIncorporationCertificateController