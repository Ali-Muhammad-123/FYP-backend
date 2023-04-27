const Panel = require("../models/panel");

class PostPanelController {
	static async Execute(req, res) {
		const { name, password } = req.body;

		if (name != undefined && password != undefined) {
			const PanelObj = new Panel({
				name: name,
				password: password,
			});

			PanelObj.save((err) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					return res.status(200).json({
						message: `panel added successfully`,
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

module.exports = PostPanelController;
