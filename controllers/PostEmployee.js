const Employee = require("../models/employee");

class PostEmployeeController {

    static async Execute(req, res) {

        const { firstName, lastName, email, mobile, company } = req.body;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            mobile != undefined &&
            company != undefined) {

            const employeeObj = new Employee({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                company: company.trim(),
            })

            await employeeObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Employee saved`,
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



module.exports = PostEmployeeController;