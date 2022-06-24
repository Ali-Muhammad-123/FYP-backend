const Emirates = require("../models/emirates");

class GetEmiratesController {

    static async Execute(req, res) {

        const { _id } = req.body;

        if (_id != undefined) {



            var emirates = await Emirates.find({
                _id: _id
            });

            if (emirates && emirates.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    emirates: emirates
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }


        } else {

            var emirates = await Emirates.find();

            if (emirates && emirates.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    emirates: emirates
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetEmiratesController