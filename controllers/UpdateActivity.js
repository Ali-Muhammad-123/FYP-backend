const Activity = require("../models/activity");


class UpdateActivityController {

    static async Execute(req, res) {

        const { name, mainland_id } = req.body;
        const { id } = req.query;

        if (
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {


            Activity.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        name: name,
                        mainland_id: mainland_id,
                    }
                },
                { upsert: true },
                (err, response) => {
                    if (err) {
                        res.status(400).json({
                            message: `Error: ${err}`,
                        });
                    } else {
                        res.status(200).json({
                            message: `Activity Updated.`,
                        });
                    }
                }
            )
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }



    }
}

module.exports = UpdateActivityController;