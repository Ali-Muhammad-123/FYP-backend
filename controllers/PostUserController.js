const User = require("../models/user");
const Credential = require("../models/credential");

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

            await user.save((err, response) => {
                if (err) {
                    return res.status(400).send(err, response);
                }
                else {
                    // const credential = new Credential({
                    //     user : response._id,
                    //     email : response.email,
                    //     password
                    // });



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