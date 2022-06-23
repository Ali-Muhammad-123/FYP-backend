const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");


class PostOfficeLeaseAgreementController {

    static async Execute(req, res) {

        const { user, dateOfIssue, expiryDate, leaseAgreement } = req.body;

        if (user != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            leaseAgreement != undefined) {

            const officeLeaseAgreement = new OfficeLeaseAgreement({
                user: user,
                dateOfIssue: dateOfIssue,
                expiryDate: expiryDate,
                leaseAgreement: leaseAgreement
            })

            await officeLeaseAgreement.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `lease agreement added successfully`
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

module.exports = PostOfficeLeaseAgreementController;