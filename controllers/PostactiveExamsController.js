const ActiveExams = require("../models/activeExams");

class PostactiveExamsController {
	static async Execute(req, res) {
		const { activeExam } = req.body;

		if (activeExam != undefined) {
			const activeExams = new ActiveExams({
				activeExam,
			});

			activeExams.save((err) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					res.status(200).json({
						message: `active Exam saved`,
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

module.exports = PostactiveExamsController;
