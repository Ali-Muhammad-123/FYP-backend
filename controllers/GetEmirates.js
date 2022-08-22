const Emirates = require("../models/emirates");

class GetEmiratesController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {



            var emirates = await Emirates.find({
                _id: id
            });

            if (emirates && emirates.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    emirates: emirates
                });

            } else {
                res.status(200).json({
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
                res.status(200).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetEmiratesController