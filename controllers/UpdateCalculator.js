const Panel = require("../models/group");

class GetGroupsController {
	static async Execute(req, res) {
		const { panel } = req.params;

		if (panel != undefined) {
			Group.find({});
			Calculator.findOneAndUpdate(
				{ _id: id },
				{
					$set: {
						calculatorActivity: calculatorActivity.trim(),
						emirates: emirates.trim(),
						name: name.trim(),
						noOfShareholders: noOfShareholders.trim(),
						visaAllocation: visaAllocation.trim(),
						freeZoneType: freeZoneType.trim(),
						freeZone: freeZone.trim(),
						price: price.trim(),
						description: description.trim(),
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
							message: `Calculator Updated.`,
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

module.exports = GetGroupsController;
