const Consultant = require("../models/consultant");

class GetConsultantController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {



            var consultant = await Consultant.find({
                _id: id
            });

            if (consultant && consultant.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    consultant: consultant
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var consultant = await Consultant.find();

            if (consultant && consultant.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    consultant: consultant
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetConsultantController