const Employee = require("../models/employee");

class DeleteEmployeeController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            Employee.findOneAndDelete({ "_id": _id }, function (err, response) {
                if (!err) {
                    if (response && response != null) {
                        res.status(200).json({
                            message: `Sucessfully deleted `,
                            result: response
                        });
                    } else {
                        res.status(403).json({
                            message: `No record found`,
                        });
                    }

                }
                else {

                    res.status(400).json({
                        message: `Error : ${err}`,
                    });
                }
            });

        } else {

            res.status(400).json({
                message: `Invalid Request`,
            });

        }

    }

}



module.exports = DeleteEmployeeController;
