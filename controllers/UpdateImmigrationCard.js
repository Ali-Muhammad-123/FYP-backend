const ImmigrationCard = require("../models/Advisor");
const File = require("../models/file");
const deleteFile = require("./DeleteFile");

class UpdateImmigrationCardController {
	static async Execute(req, res) {
		const { user, dateOfIssue, expiryDate } = req.body;
		const { id } = req.query;

		if (
			user != undefined &&
			dateOfIssue != undefined &&
			expiryDate != undefined &&
			id != undefined &&
			id.match(/^[0-9a-fA-F]{24}$/)
		) {
			if (req.file != undefined) {
				var oldImmigrationCard = await ImmigrationCard.findOne({ _id: id });
				if (oldImmigrationCard && oldImmigrationCard.file) {
					deleteFile.Execute(oldImmigrationCard.file, req.route.path);
				}

				var final_file = {
					file: req.file.filename,
					contentType: req.file.mimetype,
					docOF: req.route.path,
				};
				File.create(final_file, function (err, result) {
					if (err) {
						res.status(400).json({
							message: `Error: ${err}`,
						});
					} else {
						ImmigrationCard.findOneAndUpdate(
							{ _id: id },
							{
								$set: {
									user: user.trim(),
									dateOfIssue: dateOfIssue.trim(),
									expiryDate: expiryDate.trim(),
									file: result._id,
								},
							},
							{ upsert: true },
							(err, response) => {
								if (err) {
									res.status(400).json({
										message: `Error: ${err}`,
									});
								} else {
									res.status(200).json({
										message: `Immigration Card Updated with file.`,
									});
								}
							}
						);
					}
				});
			} else {
				ImmigrationCard.findOneAndUpdate(
					{ _id: id },
					{
						$set: {
							user: user.trim(),
							dateOfIssue: dateOfIssue.trim(),
							expiryDate: expiryDate.trim(),
						},
					},
					{ upsert: true },
					(err, response) => {
						if (err) {
							res.status(400).json({
								message: `Error: ${err}`,
							});
						} else {
							res.status(200).json({
								message: `Immigration Card Updated without file.`,
							});
						}
					}
				);
			}
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = UpdateImmigrationCardController;
