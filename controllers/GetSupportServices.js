const serviceSchema = require("../models/supportServices");

class GetSupportServiceController {
	static async Execute(req, res) {
		serviceSchema.find();
		const { id } = req.query;

		if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
			var supportServices = await serviceSchema
				.find({
					_id: id,
				})
				.populate({
					path: "requests",
				});

			if (supportServices && supportServices.length > 0) {
				res.status(200).json({
					message: "Sucess",
					supportServices: supportServices,
				});
			} else {
				res.status(200).json({
					message: "No Record found",
				});
			}
		} else {
			var supportServices = await serviceSchema.find({}).populate({
				path: "requests",
			});

			if (supportServices && supportServices.length > 0) {
				res.status(200).json({
					message: "Sucess",
					supportServices: supportServices,
				});
			} else {
				res.status(200).json({
					message: "No Record found",
				});
			}
		}
	}
}

module.exports = GetSupportServiceController;
