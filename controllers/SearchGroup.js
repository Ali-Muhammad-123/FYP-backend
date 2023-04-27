const Group = require("../models/group");

class SearchGroupController {
	static async Execute(req, res) {
		var id = req.query.id;

		if (id != undefined) {
			var group = await Group.find({
				studentOne: id,
			});

			if (group.length === 0) {
				group = await Group.find({
					studentTwo: id,
				});
			}

			if (group.length > 0) {
				res.status(200).json({
					message: "Group Found",
					group: group[0],
				});
			} else {
				res.status(400).json({
					message: "No Record found",
				});
			}
		} else {
			res.status(400).json({
				message: "No Record found",
			});
		}
	}
}

module.exports = SearchGroupController;
