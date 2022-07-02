const Employee = require("../models/employee");

class GetEmployeeController {

    static async Execute(req, res) {

        const { id, company } = req.query;

        if (id != undefined || company != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {

            var employee;


            if (company) {
                employee = await Employee.find({

                    id: id
                }).populate({
                    path: 'company'
                })
            } else {
                employee = await Employee.find({

                    company: company
                }).populate({
                    path: 'company'
                });
            }

            if (employee && employee.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    employee: employee
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var employee = await Employee.find().populate({
                path: 'company'
            });

            if (employee && employee.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    employee: employee
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetEmployeeController