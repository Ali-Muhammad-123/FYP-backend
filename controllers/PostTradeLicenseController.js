const jwt = require("jsonwebtoken");
const tradeLicense = require("../models/TradeLicense");
class PostTradeLicenseController {

    static async Execute(req, res) {


        const { client, licenseNo, code, companyName, judiciary, establishmentDate, dateOfIssue,
            expiryDate, request, license } = req.body;

        if (client != undefined &&
            licenseNo != undefined &&
            code != undefined &&
            companyName != undefined &&
            judiciary != undefined &&
            establishmentDate != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            request != undefined &&
            license != undefined) {

            const TradeLicense = new tradeLicense({
                client: client,
                licenseNo: licenseNo,
                code: code,
                companyName: companyName,
                judiciary: judiciary,
                establishmentDate: establishmentDate,
                dateOfIssue: dateOfIssue,
                expiryDate: expiryDate,
                request: request,
                license: license
            })

            await TradeLicense.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `trade License saved`,
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



module.exports = PostTradeLicenseController;