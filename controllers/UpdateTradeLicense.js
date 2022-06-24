const tradeLicense = require("../models/TradeLicense");
const File = require("../models/file");
class UpdateTradeLicenseController {
    static async Execute(req, res, next) {
        const {
            user,
            licenseNo,
            code,
            companyName,
            judiciary,
            establishmentDate,
            dateOfIssue,
            expiryDate,
            request,
        } = req.body;

        if (
            user != undefined &&
            licenseNo != undefined &&
            code != undefined &&
            companyName != undefined &&
            judiciary != undefined &&
            establishmentDate != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            request != undefined &&
            req.file != undefined
        ) {
            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var query = { 'user': req.user };

                    tradeLicense.findOneAndUpdate(
                        query,
                        {
                            licenseNo: licenseNo,
                            code: code,
                            companyName: companyName,
                            judiciary: judiciary,
                            establishmentDate: establishmentDate,
                            dateOfIssue: dateOfIssue,
                            expiryDate: expiryDate,
                            request: request,
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

module.exports = UpdateTradeLicenseController;
