const client = require("../models/Client");
const jwt = require("jsonwebtoken");


class LoginController {
    static async Execute(req, res) {


        const { email, password } = req.body;

        if (email != undefined && password != undefined) {

            const existingUser = await client.find({
                email: email,
                password: password,
            });

            if (existingUser && existingUser.length > 0) {
                const token = jwt.sign(
                    JSON.stringify({ email: existingUser[0].email }),
                    process.env.ACCESS_TOKEN_JWT
                );
                res.setHeader("x-auth-token", token);
                res.status(200).send({
                    message: "Login Successfull",
                    email: existingUser[0].email,
                    _id: existingUser[0]._id
                });
            } else {
                res.status(400).send({
                    message: "Invalid credencial",
                });
            }
        } else {
            res.status(400).send({
                message: "Login Unsuccessfull",
            });
        }


    }

}


module.exports = LoginController;