const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const File = require("../models/file");

class UpdateOfficeLeaseAgreementController {

    static async Execute(req, res) {

        const { user, dateOfIssue, expiryDate } = req.body;
        const { _id } = req.query;

        if (user != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            _id != undefined) {

            if (req.file != undefined) {
                var final_file = {
                    file: req.file.filename,
                    contentType: req.file.mimetype,
                };
                File.create(final_file, function (err, result) {
                    if (err) {
                        res.status(400).json({
                            message: `Error: ${err}`,
                        });
                    } else {

                        OfficeLeaseAgreement.findOneAndUpdate(
                            { '_id': _id },
                            {
                                $set:
                                {
                                    user: user,
                                    dateOfIssue: dateOfIssue,
                                    expiryDate: expiryDate,
                                    file: result._id,
                                }
                            },
                            { upsert: true },
                            (err, response) => {
                                if (err) {
                                    res.status(400).json({
                                        message: `Error: ${err}`,
                                    });
                                } else {
                                    res.status(200).json({
                                        message: `Office Lease Agreement updated with file.`,
                                    });
                                }
                            }
                        )
                    }
                });
            } else {
                OfficeLeaseAgreement.findOneAndUpdate(
                    { '_id': _id },
                    {
                        $set:
                        {
                            user: user,
                            dateOfIssue: dateOfIssue,
                            expiryDate: expiryDate,
                        }
                    },
                    { upsert: true },
                    (err, response) => {
                        if (err) {
                            res.status(400).json({
                                message: `Error: ${err}`,
                            });
                        } else {
                            res.status(200).json({
                                message: `Office Lease Agreement updated without file.`,
                            });
                        }
                    }
                )
            }


        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }



    }
}

module.exports = UpdateOfficeLeaseAgreementController;