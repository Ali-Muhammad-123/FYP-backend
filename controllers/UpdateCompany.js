const Company = require("../models/company");

class UpdateCompanyController {

    static async Execute(req, res) {

        const { owner, name, licenseNo, licenseCode, judiciary, establishmentDate,
            issueDate, expiryDate, activities } = req.body;

        const { id } = req.query;

        if (owner != undefined &&
            name != undefined &&
            licenseNo != undefined &&
            judiciary != undefined &&
            establishmentDate != undefined &&
            issueDate != undefined &&
            expiryDate != undefined &&
            activities != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {



            Company.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        owner: owner,
                        name: name,
                        licenseNo: licenseNo,
                        licenseCode: licenseCode,
                        judiciary: judiciary,
                        establishmentDate: establishmentDate,
                        issueDate: issueDate,
                        expiryDate: expiryDate,
                        activities: activities,
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
                            message: `company Updated.`,
                        });
                    }
                }
            );


        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = UpdateCompanyController;