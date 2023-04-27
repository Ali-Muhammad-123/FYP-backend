const File = require("../models/file");
const Advisor = require("../models/Advisor");

class PostAdvisorController {
	static async Execute(req, res) {
		const {
			name,
			department,
			highestQualification,
			designation,
			contactNumber,
			email,
		} = req.body;

		if (
			(name,
			department,
			highestQualification,
			designation,
			contactNumber,
			email)
		)
			company.save(async (err, response) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					console.log(req.files);

					if (Object.keys(req.files).includes("immigrationCard")) {
						var immigrationCardAllFiles = [];
						for (const file of req.files.incorporationCertificate) {
							var final_file = {
								file: file.filename,
								contentType: file.mimetype,
								docOF: req.route.path,
							};
							const fileNew = await File.create(final_file);
							immigrationCardAllFiles.push(fileNew._id);
						}

						immigrationCard.create({
							company: response._id,
							dateOfIssue: dateOfIssue,
							expiryDate: expiryDate,
							file: immigrationCardAllFiles,
						});
					}

					res.status(200).json({
						message: `Company created sucessfully`,
					});
				}
			});
	}
}

module.exports = PostAdvisorController;
