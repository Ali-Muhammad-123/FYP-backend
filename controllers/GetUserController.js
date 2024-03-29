const User = require("../models/user");

class GetUserController {
	static async Execute(req, res) {
		const { id } = req.query;

		if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
			User.findById(id, function (err, result) {
				if (err) {
					res.status(400).send(err);
				} else {
					if (result) {
						res.status(200).send({
							message: "Successfull",
							id: result._id,
							user: result,
						});
					} else {
						res.status(200).send({
							message: "No records found!",
						});
					}
				}
			})
				.populate({
					path: "final1",
				})
				.populate({
					path: "final2",
				})
				.populate({
					path: "mid1",
				})
				.populate({
					path: "mid2",
				});
		} else {
			const user = await User.find().select("_id email firstName lastName");

			if (user && user.length > 0) {
				res.status(200).send({
					user: user,
				});
			} else {
				res.status(200).send({
					message: "No records found!",
				});
			}
		}
	}
}

module.exports = GetUserController;
