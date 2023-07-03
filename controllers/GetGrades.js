const User = require("../models/user");
const ActiveExams = require("../models/activeExams");
const Group = require("../models/group");

class GetGrades {
	static async Execute(req, res) {
		const activeExams = await ActiveExams.find({});

		User.find({}, async function (err, result) {
			if (err) {
				res.status(400).send(err);
			} else {
				if (result) {
					var groups = await Group.find({});
					res.status(200).send({
						message: "Successfull",
						result: result,
						groups: groups,
					});
				} else {
					res.status(200).send({
						message: "No records found!",
					});
				}
			}
		}).populate({
			path: activeExams.reverse()[0].activeExam,
		});
	}
}

module.exports = GetGrades;
