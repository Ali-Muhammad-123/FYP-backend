const Panel = require("../models/panel");
const Group = require("../models/group");

class AssignGroupController {
	static async Execute(req, res) {
		const { group } = req.body;
		const { id } = req.query;

		if (id != undefined) {
			Panel.updateOne({ _id: id }, { $addToSet: { groups: group } })
				.then(() => {
					Group.updateOne({ _id: group }, { assigned: true })
						.then(() =>
							res.status(200).json({
								message: `Done`,
							})
						)
						.catch((err) => {
							res.status(400).json({
								err,
							});
						});
				})
				.catch((err) => {
					res.status(400).json({
						err,
					});
				});
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = AssignGroupController;
