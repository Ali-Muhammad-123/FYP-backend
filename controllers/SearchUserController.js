const Group = require("../models/group");
const User = require("../models/user");

class SearchUserController {
	static async Execute(req, res) {
		let name = req.query.name;
		let role = req.query.role;
		let regno = req.query.regno;
		if (name != undefined && role != undefined) {
			const existingUser = await User.find({
				name: { $regex: name, $options: "i" },
				role: role,
			});
			if (existingUser.length > 0) {
				res.status(200).json(existingUser);
			} else {
				res.status(400).json({
					message: `No users found`,
				});
			}
		} else if (regno != undefined && role != undefined) {
			const existingUser = await User.find({
				regno: regno,
				role: role,
			});
			if (existingUser.length > 0) {
				console.log(existingUser[0]._id);

				var group = await Group.find({
					$or: [
						{ studentOne: existingUser[0]._id },
						{ studentTwo: existingUser[0]._id },
					],
				});
				console.log(group);
				if (group.length == 0) res.status(200).json(existingUser);
				else
					res.status(400).json({
						message: `No users found`,
					});
			} else {
				res.status(400).json({
					message: `No users found`,
				});
			}
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = SearchUserController;
