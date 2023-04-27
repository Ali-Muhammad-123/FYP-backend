const Group = require("../models/group");

class GetGroupController {
	static async Execute(req, res) {
		const { groupId } = req.query;
		if (groupId !== undefined) {
			const groups = await Group.find({ _id: groupId })
				.populate({
					path: "studentOne",
					select: "name regno program",
				})
				.populate({
					path: "studentTwo",
					select: "name regno program",
				})
				.populate({
					path: "advisor",
					select: "name",
				});

			if (groups.length > 0) {
				return res.status(200).json({
					groups,
				});
			} else {
				return res.status(400).json({
					message: "Groups not found",
				});
			}
		} else {
			const groups = await Group.find()
				.populate({
					path: "studentOne",
					select: "name regno program",
				})
				.populate({
					path: "studentTwo",
					select: "name regno program",
				})
				.populate({
					path: "advisor",
					select: "name",
				});

			if (groups.length > 0) {
				return res.status(200).json({
					groups,
				});
			} else {
				return res.status(400).json({
					message: "Groups not found",
				});
			}
		}
	}
}

module.exports = GetGroupController;
