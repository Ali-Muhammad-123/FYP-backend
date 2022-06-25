const Visa = require("../models/visa");
class GetVisaController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {


            const visa = await Visa.find({
                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName companyName',
            });

            if (visa && visa.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    visa: visa
                });
            } else {
                res.status(403).send({
                    message: "No records found!"
                });
            }

        } else {
            const visa = await Visa.find().populate({
                path: 'user',
                select:
                    'firstName lastName companyName',
            });

            if (visa && visa.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    visa: visa
                });
            } else {
                res.status(403).send({
                    message: "No records found!"
                });
            }
        }

    }

}



module.exports = GetVisaController;
