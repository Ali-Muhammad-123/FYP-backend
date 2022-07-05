const User = require("../models/user");
const Credential = require("../models/credential");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class PostUserController {
    static async Execute(req, res) {
        const {
            firstName,
            lastName,
            email,
            countryCode,
            mobile,
            nationality,
            dateOfBirth,
            passportDetails,
            role,
        } = req.body;

        if (
            firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            countryCode != undefined &&
            mobile != undefined &&
            nationality != undefined &&
            role != undefined
        ) {
            const user = new User({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                countryCode: countryCode.trim(),
                mobile: mobile.trim(),
                nationality: nationality.trim(),
                dateOfBirth: dateOfBirth,
                passportDetails: passportDetails.trim(),
                role: role.trim(),
            });

            const existingUser = await User.find({
                email: email,
            });

            if (existingUser.length > 0) {
                res.status(400).json({
                    message: `Email Address is already registered`,
                });
            } else {
                user.save((err, response) => {
                    if (err) {
                        return res.status(400).send(err, response);
                    } else {
                        var password = otpGenerator.generate(8, {
                            upperCaseAlphabets: false,
                            digits: true,
                            specialChars: false,
                        });
                        console.log(password);

                        bcrypt.hash(password, saltRounds).then(async function (hash) {
                            // Store hash in your password DB.
                            const credential = new Credential({
                                user: response._id,
                                email: response.email.trim(),
                                password: hash,
                                role: "client",
                            });

                            await credential.save((err) => {
                                if (err) {
                                    return res.status(400).send(err);
                                } else {
                                    res.status(200).json({
                                        message: `user added sucessfully`,
                                    });
                                }
                            });
                        });
                    }
                });
            }
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }
    }
}

module.exports = PostUserController;
