const user = require("../models/user");
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class SignupController {

    static async Execute(req, res) {


        const { firstName, lastName, email, mobile, role } = req.query;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            mobile != undefined &&
            role != undefined
        ) {


            var password = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
            console.log(password)

            bcrypt.hash(password, saltRounds).then(async function (hash) {
                // Store hash in your password DB.



                const User = new user({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobile: mobile,
                    password: hash,
                    role: role
                })

                const existingUser = await user.find({
                    email: email
                });

                if (existingUser.length > 0) {
                    res.status(400).json({
                        message: `Email Address is already registered`,
                    });
                }
                else {
                    await User.save((err) => {
                        if (err) {
                            return res.status(400).send(err);
                        }
                        else {
                            res.status(200).json({
                                message: `user Signup sucessfull`,
                            });
                        }
                    })

                }

            });

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }



    }
}


module.exports = SignupController;