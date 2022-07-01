const Emirates = require("../models/emirates");

class UpdateEmiratesController {

    static async Execute(req, res) {

        const { name } = req.body;
        const { id } = req.query;

        if (name != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {

            Emirates.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        name: name.trim(),
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