const user = require("../models/user");
const Credential = require("../models/credential");
const bcrypt = require('bcrypt');
const { response } = require("express");
const saltRounds = 10;
const otpGenerator = require("otp-generator");

class SignupController {

    static async Execute(req, res) {


        const { firstName, lastName, email, countryCode, mobile,
            nationality, dateOfBirth, passportDetails, role, password, confirmPassword } = req.body;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            countryCode != undefined &&
            mobile != undefined &&
            nationality != undefined &&
            role != undefined &&
            password != undefined &&
            confirmPassword != undefined
        ) {

            if (password === confirmPassword) {

                bcrypt.hash(password, saltRounds).then(async function (hash) {
                    // Store hash in your password DB.



                    const User = new user({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        countryCode: countryCode.trim(),
                        mobile: mobile.trim(),
                        nationality: nationality.trim(),
                        dateOfBirth: dateOfBirth.trim(),
                        passportDetails: passportDetails.trim(),
                        role: role.trim(),
                        password: hash,
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


                        await User.save(async (err, response) => {
                            if (err) {
                                return res.status(400).send(err);
                            }
                            else {
                                const credential = new Credential({
                                    user: response._id,
                                    email: response.email,
                                    password: hash,
                                    role: "client"
                                });

                                await credential.save(async (err) => {
                                    if (err) {
                                        return res.status(400).send(err);
                                    }
                                    else {
                                        res.status(200).json({
                                            message: `user Signup sucessfull`,
                                        });
                                    }
                                })

                                var password = await otpGenerator.generate(4, {
                                    upperCaseAlphabets: false,
                                    digits: true,
                                    specialChars: false,
                                    lowerCaseAlphabets: false
                                });
                                console.log(password);

                            }
                        });

                    }

                });
            } else {
                res.status(400).json({
                    message: `password does not match`,
                });
            }

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }



    }
}


module.exports = SignupController;