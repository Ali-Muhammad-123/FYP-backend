const Panel = require("../models/panel");

class GetPanelController {
	static async Execute(req, res) {
		const { name, password } = req.query;

		if (name != undefined && password != undefined) {
			var panel = await Panel.find({
				name,
				password,
			}).populate({
				path: "groups",
			});

			if (panel && panel.length > 0) {
				res.status(200).json({
					message: "Sucess",
					panel: panel,
				});
			} else {
				res.status(200).json({
					message: "No Record found",
				});
			}
		} else {
			var panel = await Panel.find().populate({
				path: "groups",
			});

			if (panel && panel.length > 0) {
				res.status(200).json({
					message: "Sucess",
					panel: panel,
				});
			} else {
				res.status(200).json({
					message: "No Record found",
				});
			}
		}
	}
}

module.exports = GetPanelController;
