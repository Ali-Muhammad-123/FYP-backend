const Visa = require("../models/visa");
const File = require("../models/file");

class PostVisaController {

    static async Execute(req, res) {


        const { user, companyName, visaApplicant, visaUID, visaType, jobTitle, dateOfIssue,
            expiryDate } = req.body;

        if (user != undefined &&
            companyName != undefined &&
            visaApplicant != undefined &&
            visaUID != undefined &&
            visaType != undefined &&
            jobTitle != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined
        ) {


            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    Visa.create(
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
                        },
                        (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("saved");
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