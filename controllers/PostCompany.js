const Company = require("../models/company");

class PostCompanyController {

    static async Execute(req, res) {

        const { owner, name, licenseNo, licenseCode, judiciary, establishmentDate,
            issueDate, expiryDate, activities } = req.body;

        if (owner != undefined &&
            name != undefined &&
            licenseNo != undefined &&
            judiciary != undefined &&
            establishmentDate != undefined &&
            issueDate != undefined &&
            expiryDate != undefined &&
            activities != undefined) {

            const company = new Company({
                owner: owner,
                name: name,
                licenseNo: licenseNo,
                licenseCode: licenseCode,
                judiciary: judiciary,
                establishmentDate: establishmentDate,
                issueDate: issueDate,
                expiryDate: expiryDate,
                activities: activities
            })

            await company.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Company saved`,
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



module.exports = PostCompanyController;