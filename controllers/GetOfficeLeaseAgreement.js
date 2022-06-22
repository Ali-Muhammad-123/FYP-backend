const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");

class GetOfficeLeaseAgreementController {

    static async Execute(req, res) {

        var agreements = await OfficeLeaseAgreement.find().populate({
            path: 'client',
            select:
                'firstName lastName',
        });

        if (agreements && agreements.length > 0) {

            res.status(200).json({
                message: "Sucess",
                agreements: agreements
            });

        } else {
            res.status(404).json({
                message: "No Record found",
            });
        }


    }
}



module.exports = GetOfficeLeaseAgreementController;