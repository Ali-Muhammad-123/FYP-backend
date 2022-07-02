const Company = require("../models/company");

class GetCompanyController {
	static async Execute(req, res) {
		const { id } = req.query;

		if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
			var company = await Company.find({
				owner: id,
			})
				.populate({
					path: "activities",
				})
				.populate({
					path: "owner",
					select: "firstName lastName",
				});

			if (company && company.length > 0) {
				res.status(200).json({
					message: "Sucess",
					company: company,
				});
			} else {
				res.status(403).json({
					message: "No Record found",
				});
			}
		} else {
			var company = await Company.find().populate({
				path: "activities",
			}).populate({
				path: "owner",
				select: "firstName lastName",
			});


			if (company && company.length > 0) {
				res.status(200).json({
					message: "Sucess",
					company: company,
				});
			} else {
				res.status(403).json({
					message: "No Record found",
				});
			}
		}
	}
}

module.exports = GetCompanyController;
