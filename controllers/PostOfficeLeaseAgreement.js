const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const File = require("../models/file");

class PostOfficeLeaseAgreementController {

    static async Execute(req, res) {

        const { company, dateOfIssue, expiryDate } = req.body;

        if (company != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            req.file != undefined) {

            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
                docOF: req.route.path,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    res.status(400).json({
                        message: `Error: ${err}`,
                    });
                } else {
                    OfficeLeaseAgreement.create(
                        {
                            company: company.trim(),
                            dateOfIssue: dateOfIssue.trim(),
                            expiryDate: expiryDate.trim(),
                            file: result._id.trim(),
                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Office Lease Agreement Saved.`,
                                });
                            }
                        }
                    );
                }
            });
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }



    }
}

module.exports = PostOfficeLeaseAgreementController;