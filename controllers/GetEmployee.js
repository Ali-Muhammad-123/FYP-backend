const Employee = require("../models/employee");

class GetEmployeeController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            var employee = await Employee.find({

                _id: _id
            }).populate({
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