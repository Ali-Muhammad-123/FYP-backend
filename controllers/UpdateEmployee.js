const Employee = require("../models/employee");

class UpdateEmployeeController {

    static async Execute(req, res) {

        const { firstName, lastName, email, mobile, company } = req.body;
        const { id } = req.query;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            mobile != undefined &&
            company != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {

            Employee.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobile: mobile,
                        company: company,
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
                            message: `Employee Updated.`,
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



module.exports = UpdateEmployeeController;