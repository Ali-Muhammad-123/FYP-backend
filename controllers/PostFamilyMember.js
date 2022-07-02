const FamilyMember = require("../models/familyMember");

class PostFamilyMemberController {

    static async Execute(req, res) {

        const { firstName, lastName, email, mobile, employee } = req.body;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            mobile != undefined &&
            employee != undefined) {

            const familyMember = new FamilyMember({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                employee: employee.trim(),
            })

            await familyMember.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `family member saved`,
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



module.exports = PostFamilyMemberController;