const Mainland = require("../models/mainland");


class UpdateMainlandController {

    static async Execute(req, res) {

        const { name, emirates_id } = req.body;
        const { id } = req.query;

        if (
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {


            Mainland.findOneAndUpdate(
                { '_id': id },
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
                            message: `Mainland Updated.`,
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

module.exports = UpdateMainlandController;