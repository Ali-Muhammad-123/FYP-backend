const ActiveExams = require("../models/activeExams");

class GetActiveExamsController {
	static async Execute(req, res) {
		const activeExams = await ActiveExams.find({});

		if (activeExams && activeExams.length > 0) {
			res.status(200).json({
				message: "Sucess",
				activeExam: activeExams.reverse()[0],
			});
		} else {
			res.status(200).json({
				message: "No Record found",
			});
		}
	}
}

module.exports = GetActiveExamsController;
