const User = require("../models/user");


class PostUserController {

    static async Execute(req, res) {

        const { firstName, lastName, email, countryCode, mobile, nationality,
            dateOfBirth, passportDetails, role } = req.body;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            countryCode != undefined &&
            mobile != undefined &&
            nationality != undefined &&
            role != undefined) {

            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobile: mobile,
                nationality: nationality,
                dateOfBirth: dateOfBirth,
                passportDetails: passportDetails,
                role: role,
            })

            await user.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `User added successfully`
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

module.exports = PostUserController;