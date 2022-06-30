const Activity = require("../models/activity");


class PostActivityController {

    static async Execute(req, res) {

        const { name, emirates_id } = req.body;
        const { _id } = req.query;

        if (name != undefined &&
            emirates_id != undefined &&
            _id != undefined) {


            Activity.findOneAndUpdate(
                { '_id': _id },
                {
                    $set:
                    {
                        name: name,
                        emirates_id: emirates_id,
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
                            message: `Incorporation Certificate Updated.`,
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

module.exports = PostActivityController;