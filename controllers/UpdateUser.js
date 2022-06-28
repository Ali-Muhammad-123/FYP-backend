const User = require("../models/user");
const File = require("../models/file");
class UpdateUserController {
    static async Execute(req, res, next) {
        const { firstName, lastName, email, countryCode, mobile, nationality,
            dateOfBirth, passportDetails, role } = req.body;

        const { _id } = req.query

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            countryCode != undefined &&
            mobile != undefined &&
            nationality != undefined &&
            role != undefined) {

            User.findOneAndUpdate(
                { '_id': _id },
                {
                    $set:
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        countryCode: countryCode,
                        mobile: mobile,
                        nationality: nationality,
                        dateOfBirth: dateOfBirth,
                        passportDetails: passportDetails,
                        role: role
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
