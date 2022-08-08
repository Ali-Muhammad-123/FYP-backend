const Credential = require("../models/credential");
const User = require("../models/user");
const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");

class verifyBiometric {
	static async Execute(req, res, next) {
		const { signature, payload } = req.body;
		console.log(payload);

		const { id } = req.query;

		if (
			signature != undefined &&
			payload != undefined &&
			id != undefined &&
			id.match(/^[0-9a-fA-F]{24}$/)
		) {
			const existingUser = await User.findOne({ _id: id });
			const cred = await Credential.findOne({ user: id });
			console.log(cred.publicKey);
			console.log(payload);

			const decryptionKey = new NodeRSA(cred.publicKey, "public");
			decryptionKey.setOptions({ signingScheme: "pkcs1-sha256" });

			const isVerified = decryptionKey.verify(
				payload,
				signature,
				"ascii",
				"base64"
			);

			console.log(isVerified);

			const token = jwt.sign(
				JSON.stringify({
					_id: existingUser._id,
					role: existingUser.role,
				}),
				process.env.ACCESS_TOKEN_JWT
			);
			if (isVerified) {
				res.setHeader("x-auth-token", token);
				res.status(200).send({
					message: "Login Successfull",
					token: token,
				});
			} else {
				res.status(400).send({
					message: "Invalid Biometric",
				});
			}
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = verifyBiometric;
