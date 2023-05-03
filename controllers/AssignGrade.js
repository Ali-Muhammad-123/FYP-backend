const Grade = require("../models/grade");

class AssignGrade {
	static async Execute(req, res) {
		const { remarks, presentation, code, erd, srs, formatting } = req.body;
		const { id } = req.query;

		if (
			remarks != undefined ||
			presentation != undefined ||
			code != undefined ||
			erd != undefined ||
			srs != undefined ||
			formatting != undefined
		) {
			Grade.updateOne(
				{ _id: id },
				{ remarks, presentation, code, erd, srs, formatting }
			)
				.then(() =>
					res.status(200).json({
						message: `Done`,
					})
				)
				.catch((err) =>
					res.status(400).json({
						message: `Invalid Request`,
						err,
					})
				);
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = AssignGrade;
