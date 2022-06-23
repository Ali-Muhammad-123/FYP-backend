const ImmigrationCard = require("../models/ImmigrationCard");


class PostImmigrationCardController {

    static async Execute(req, res) {

        const { user, dateOfIssue, expiryDate, immigrationCard } = req.body;

        if (user != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            immigrationCard != undefined
        ) {

            const immigrationCardObj = new ImmigrationCard({
                user: user,
                dateOfIssue: dateOfIssue,
                expiryDate: expiryDate,
                immigrationCard: immigrationCard
            })

            await immigrationCardObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `immigration Card saved`,
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


module.exports = PostImmigrationCardController;