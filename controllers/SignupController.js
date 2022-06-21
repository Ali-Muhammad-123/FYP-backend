const client = require("../models/Client");

class SignupController {

    static async Execute(req, res) {


        const { firstName, lastName, email, mobile } = req.query;

        if (firstName != undefined &&
            lastName != undefined &&
            email != undefined &&
            mobile != undefined
        ) {

            const Client = new client({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                password: "dummy password"
            })

            await Client.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Client Signup sucessfull`,
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


module.exports = SignupController;