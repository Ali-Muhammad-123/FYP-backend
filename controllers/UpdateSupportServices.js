const supportServices = require("../models/supportServices");

class UpdateSupportServicesController {
	static async Execute(req, res) {
		const { id } = req.query;

		if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
			supportServices.findOneAndUpdate(
				{ _id: id },
				{
					$set: {
						name: req.body.name,
						description: req.body.description,
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
							message: `Support Services updated.`,
						});
					}
				}
			);
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = UpdateSupportServicesController;
