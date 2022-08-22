const ImmigrationCard = require("../models/ImmigrationCard");

class GetImmigrationCardController {

    static async Execute(req, res) {

        const { user } = req.query;

        if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {



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
                res.status(200).json({
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

module.exports = GetImmigrationCardController