const Emirates = require("../models/emirates");
const Mainland = require("../models/mainland");
const Activity = require("../models/activity");
const { options } = require("../routes/emirates");


class DeleteEmiratesController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {

            const mainland = await Mainland.find({ "emirates_id": id });

            for (const file of mainland) {
                await Activity.deleteMany({ "mainland_id": file._id });
            }

            const result = await Mainland.deleteMany({ "emirates_id": id }, { new: true });
            console.log("fdsf")
            console.log(result)

            Emirates.findOneAndDelete({ "_id": id }, function (err, response) {
                if (!err) {
                    if (response && response != null) {
                        res.status(200).json({
                            message: `Sucessfully deleted `,
                            result: response
                        });
                    } else {
                        res.status(403).json({
                            message: `No record found`,
                        });
                    }

                }
                else {

                    res.status(400).json({
                        message: `Error : ${err}`,
                    });
                }
            });

        } else {

            res.status(400).json({
                message: `Invalid Request`,
            });

        }

    }

}



module.exports = DeleteEmiratesController;
