const Emirates = require("../models/emirates");

class UpdateEmiratesController {

    static async Execute(req, res) {

        const { name } = req.body;
        const { _id } = req.query;

        if (name != undefined &&
            _id != undefined) {

            Emirates.findOneAndUpdate(
                { '_id': _id },
                {
                    $set:
                    {
                        name: name,
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
                            message: `Emirates Updated.`,
                        });
                    }
                }
            );
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = UpdateEmiratesController;