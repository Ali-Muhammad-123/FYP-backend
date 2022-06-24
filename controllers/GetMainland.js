const Mainland = require("../models/mainland");

class GetMainlandController {

    static async Execute(req, res) {

        const { _id } = req.body;

        if (_id != undefined) {



            var mainland = await Mainland.find({
                _id: _id
            });

            if (mainland && mainland.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    mainland: mainland
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }


        } else {

            var mainland = await Mainland.find();

            if (mainland && mainland.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    mainland: mainland
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetMainlandController