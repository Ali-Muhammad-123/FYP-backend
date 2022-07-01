const User = require("../models/user");
const File = require("../models/file");
class UpdateUserController {
    static async Execute(req, res, next) {
        const { firstName, lastName, email, countryCode, mobile, nationality,
            dateOfBirth, passportDetails, role } = req.body;

        const { id } = req.query

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            countryCode != undefined &&
            mobile != undefined &&
            nationality != undefined &&
            role != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {

            User.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        countryCode: countryCode.trim(),
                        mobile: mobile.trim(),
                        nationality: nationality.trim(),
                        dateOfBirth: dateOfBirth,
                        passportDetails: passportDetails,
                        role: role.trim(),
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
                            message: `User Updated.`,
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

module.exports = UpdateUserController;
