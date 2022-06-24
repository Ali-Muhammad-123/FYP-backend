const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



class LoginController {
    static async Execute(req, res) {


        const { email, password } = req.body;

        if (email != undefined && password != undefined) {


            const existingUser = await user.findOne({
                email: email,
            });





            if (existingUser) {

                await bcrypt.compare(password, existingUser.password).then(function (result) {

                    if (result == true) {
                        const token = jwt.sign(
                            JSON.stringify({ _id: existingUser._id, role: existingUser.role }),
                            process.env.ACCESS_TOKEN_JWT
                        );
                        res.setHeader("x-auth-token", token);
                        res.status(200).send({
                            message: "Login Successfull",
                            email: existingUser.email,
                            _id: existingUser._id
                        });
                    } else {
                        res.status(400).send({
                            message: "Invaild credentials",
                        });
                    }
                });


            } else {
                res.status(400).send({
                    message: "No user found",
                });
            }
        } else {
            res.status(400).send({
                message: "Invalid request",
            });
        }


    }

}


module.exports = LoginController;