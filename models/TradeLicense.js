const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
	{
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "company",
		},
		licenseNo: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		dateOfIssue: {
			type: Date,
			required: true,
		},
		expiryDate: {
			type: Date,
			required: true,
		},
		file: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "File",
				required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("tradeLicense", TradeLicenseSchema);
