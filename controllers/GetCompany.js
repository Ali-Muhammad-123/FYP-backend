const Company = require("../models/company");

class GetCompanyController {

    static async Execute(req, res) {

        const { _id } = req.body;

        if (_id != undefined) {



            var company = await Company.find({
                owner: _id
            }).populate({
                path: 'activities'
            });

            if (company && company.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    company: company
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var company = await Company.find().populate({
                path: 'activities'
            });

            if (company && company.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    company: company
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetCompanyController