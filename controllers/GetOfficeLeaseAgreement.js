const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");

class GetOfficeLeaseAgreementController {

    static async Execute(req, res) {

        const { user } = req.query;

        if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {

            var agreements = await OfficeLeaseAgreement.find({
                user: user
            }).populate({
                path: 'company'
            });

            if (agreements && agreements.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    agreements: agreements
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }

        } else {


            var agreements = await OfficeLeaseAgreement.find().populate({
                path: 'company'
            });

            if (agreements && agreements.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    agreements: agreements
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }


        }


    }
}



module.exports = GetOfficeLeaseAgreementController;