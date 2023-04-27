const Credential = require("../models/credential");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class LoginController {
	static async Execute(req, res) {
		const { email, password } = req.body;

		if (email != undefined && password != undefined) {
			const existingUser = await Credential.findOne({
				email: email.toLowerCase(),
			});

			if (existingUser) {
				const user = await User.find({ _id: existingUser.user });
				await bcrypt
					.compare(password, existingUser.password)
					.then(function (result) {
						if (result == true) {
							const token = jwt.sign(
								JSON.stringify({
									_id: existingUser._id,
									role: existingUser.role,
								}),
								process.env.ACCESS_TOKEN_JWT
							);
							res.setHeader("x-auth-token", token);
							res.status(200).send({
								message: "Login Successfull",

								email: existingUser.email,
								role: existingUser.role,
								_id: user[0]._id,
								token: token,
								...user[0]._doc,
							});
						} else {
							res.status(400).send({
								message: "Invaild credentials",
							});
						}
					});
			} else {
				res.status(403).send({
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
