const Credential = require("../models/credential");

class UpdateFingerprint {
	static async Execute(req, res, next) {
		const { publicKey } = req.body;

		const { id } = req.query;
		console.log(id);

		if (
			publicKey != undefined &&
			id != undefined &&
			id.match(/^[0-9a-fA-F]{24}$/)
		) {
			Credential.findOneAndUpdate(
				{ user: id },
				{
					$set: {
						publicKey: publicKey,
					},
				},
				{ upsert: false },
				(err, response) => {
					if (err) {
						res.status(400).json({
							message: `Error: ${err}`,
						});
					} else {
						res.status(200).json({
							message: `Public Key Updated.`,
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

module.exports = UpdateFingerprint;
