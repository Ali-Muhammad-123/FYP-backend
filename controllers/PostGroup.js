const Grade = require("../models/grade");
const Group = require("../models/group");

class Post {
	static async Execute(req, res) {
		const {
			studentOne,
			studentTwo,
			advisor,
			semester,
			year,
			projectTitle,
			briefDetail,
			creditHours,
			compensation,
			hardwareRequirement,
			approximateCost,
		} = req.body;

		if (
			studentOne != undefined &&
			studentTwo != undefined &&
			advisor != undefined &&
			semester != undefined &&
			year != undefined &&
			projectTitle != undefined &&
			briefDetail != undefined
		) {
			const group = new Group({
				studentOne,
				studentTwo,
				advisor,
				semester,
				year,
				projectTitle,
				briefDetail,
				creditHours,
				compensation,
				hardwareRequirement,
				approximateCost,
			});

			group.save((err) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					res.status(200).json({
						message: `Submission recieved`,
					});
				}
			});
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = Post;
