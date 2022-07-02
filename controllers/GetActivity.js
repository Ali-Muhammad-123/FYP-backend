const Activity = require("../models/activity");

class GetActivityController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {



            var activity = await Activity.find({
                emirates_id: id
            });

            if (activity && activity.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    activity: activity
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var activity = await Activity.find();

            if (activity && activity.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    activity: activity
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetActivityController