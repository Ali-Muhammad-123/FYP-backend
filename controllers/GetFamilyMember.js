const FamilyMember = require("../models/familyMember");

class GetFamilyMemberController {

    static async Execute(req, res) {

        const { employee } = req.query;

        if (employee != undefined && employee.match(/^[0-9a-fA-F]{24}$/)) {

            var familyMember = await FamilyMember.find({
                employee: employee
            }).populate({
                path: 'employee'
            });

            if (familyMember && familyMember.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    familyMember: familyMember
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }


        } else {

            var familyMember = await FamilyMember.find().populate({
                path: 'employee'
            });

            if (familyMember && familyMember.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    familyMember: familyMember,
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetFamilyMemberController