const jwt = require("jsonwebtoken");
const tradeLicense = require("../models/TradeLicense");
class PostTradeLicenseController {

    static async Execute(req, res) {


        const { clientName, licenseNo, code, companyName, judiciary, establishmentDate, dateOfIssue,
            expiryDate, request } = req.body;

        if (clientName != undefined &&
            licenseNo != undefined &&
            code != undefined &&
            companyName != undefined &&
            judiciary != undefined &&
            establishmentDate != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            request != undefined) {

            const TradeLicense = new tradeLicense({
                clientName: clientName,
                licenseNo: licenseNo,
                code: code,
                companyName: companyName,
                judiciary: judiciary,
                establishmentDate: ISO(establishmentDate),
                dateOfIssue: dateOfIssue,
                expiryDate: expiryDate,
                request: request
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