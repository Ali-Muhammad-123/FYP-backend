const Activity = require("../models/activity");


class PostActivityController {

    static async Execute(req, res) {

        const { name, emirates_id } = req.body;

        if (name != undefined &&
            emirates_id != undefined) {

            const activityObj = new Activity({
                name: name,
                emirates_id: emirates_id,
            })

            await activityObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `activity added successfully`
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

module.exports = PostActivityController;