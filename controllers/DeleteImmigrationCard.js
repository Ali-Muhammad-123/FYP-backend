const ImmigrationCard = require("../models/Advisor");
const deleteFile = require("./DeleteFile");

class DeleteImmigrationCardController {
	static async Execute(req, res) {
		const { id } = req.query;

		if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
			var oldImmigrationCard = await ImmigrationCard.findOne({ _id: id });
			if (oldImmigrationCard && oldImmigrationCard.file) {
				deleteFile.Execute(oldImmigrationCard.file, req.route.path);
			}

			ImmigrationCard.findOneAndDelete({ _id: id }, function (err, response) {
				if (!err) {
					if (response && response != null) {
						res.status(200).json({
							message: `Sucessfully deleted `,
							result: response,
						});
					} else {
						res.status(403).json({
							message: `No record found`,
						});
					}
				} else {
					res.status(400).json({
						message: `Error : ${err}`,
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

module.exports = DeleteImmigrationCardController;
