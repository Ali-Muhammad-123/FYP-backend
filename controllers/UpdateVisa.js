const Visa = require("../models/visa");
const File = require("../models/file");

class PostVisaController {

    static async Execute(req, res) {


        const { user, companyName, visaApplicant, visaUID, visaType, jobTitle, dateOfIssue,
            expiryDate } = req.body;

        const { _id } = req.query;

        if (user != undefined &&
            companyName != undefined &&
            visaApplicant != undefined &&
            visaUID != undefined &&
            visaType != undefined &&
            jobTitle != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            req.file != undefined
        ) {


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

                    Visa.findOneAndUpdate(
                        { '_id': _id },
                        {
                            $set:
                            {
                                user: user,
                                companyName: companyName,
                                visaApplicant: visaApplicant,
                                visaUID: visaUID,
                                visaType: visaType,
                                jobTitle: jobTitle,
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
                                    message: `Visa updated.`,
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


module.exports = PostVisaController;