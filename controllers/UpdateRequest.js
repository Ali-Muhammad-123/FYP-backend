const Request = require("../models/request");

class PostRequestController {

    static async Execute(req, res) {

        const { user, requestType } = req.body;
        const { _id } = req.query;

        if (user != undefined &&
            requestType != undefined) {

            Request.findOneAndUpdate(
                { '_id': _id },
                {
                    $set:
                    {
                        user: user.trim(),
                        requestType: requestType.trim()
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
                            message: `Request Updated.`,
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



module.exports = PostRequestController;