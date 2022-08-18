const supportServices = require("../models/supportServices");

class PostServicesController {
	static async Execute(req, res) {
		const { name, description } = req.body;

		if (name != undefined && description != undefined) {
			const services = new supportServices({
				name: name,
				description: description,
			});

			await services.save((err) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					res.status(200).json({
						message: `Service saved`,
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

module.exports = PostServicesController;
